import { FuelInputs, FuelResults } from "../types";

const KM_PER_MILE = 1.609344;
const LITRES_PER_US_GALLON = 3.785411784;
const LITRES_PER_UK_GALLON = 4.54609;

/** Convert any supported efficiency figure to litres per 100 km. */
export function efficiencyToLPer100km(value: number, unit: string): number {
  const v = Number(value) || 0;
  if (v <= 0) return 0;
  switch (unit) {
    case "kmpl":
      return 100 / v;
    case "l100km":
      return v;
    case "mpg_us":
      return 235.214583 / v;
    case "mpg_uk":
      return 282.480936 / v;
    default:
      return v;
  }
}

/** Convert any supported price figure to price per litre. */
export function priceToPerLitre(price: number, unit: string): number {
  const p = Number(price) || 0;
  if (p <= 0) return 0;
  switch (unit) {
    case "per_litre":
      return p;
    case "per_us_gallon":
      return p / LITRES_PER_US_GALLON;
    case "per_uk_gallon":
      return p / LITRES_PER_UK_GALLON;
    default:
      return p;
  }
}

export function calculateFuelCost(inputs: FuelInputs): FuelResults {
  const dist = Math.max(0, Number(inputs.distance) || 0);
  const distanceKm = inputs.distanceUnit === "mi" ? dist * KM_PER_MILE : dist;
  const oneWayKm = inputs.roundTrip ? distanceKm * 2 : distanceKm;

  const lPer100km = efficiencyToLPer100km(inputs.efficiency, inputs.efficiencyUnit);
  const pricePerLitre = priceToPerLitre(inputs.fuelPrice, inputs.fuelPriceUnit);

  const invalid = oneWayKm <= 0 || lPer100km <= 0 || pricePerLitre <= 0;

  if (invalid) {
    return {
      distanceKm: oneWayKm,
      fuelNeededLitres: 0,
      fuelNeededUsGallons: 0,
      pricePerLitre,
      singleTripCost: 0,
      costPerKm: 0,
      monthlyCost: 0,
      perPersonCost: 0,
      invalid: true,
    };
  }

  const fuelNeededLitres = (oneWayKm * lPer100km) / 100;
  const singleTripCost = fuelNeededLitres * pricePerLitre;
  const costPerKm = singleTripCost / oneWayKm;
  const trips = Math.max(0, Number(inputs.tripsPerMonth) || 0);
  const monthlyCost = singleTripCost * trips;
  const passengers = Math.max(1, Math.floor(Number(inputs.passengers) || 1));

  return {
    distanceKm: oneWayKm,
    fuelNeededLitres,
    fuelNeededUsGallons: fuelNeededLitres / LITRES_PER_US_GALLON,
    pricePerLitre,
    singleTripCost,
    costPerKm,
    monthlyCost,
    perPersonCost: singleTripCost / passengers,
    invalid: false,
  };
}
