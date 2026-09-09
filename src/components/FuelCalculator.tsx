import React, { useMemo } from "react";
import { Fuel, Gauge, Banknote, Users } from "lucide-react";
import { FuelInputs, CurrencyCode } from "../types";
import { CURRENCIES } from "../data/geoTiers";
import { calculateFuelCost } from "../utils/fuelCalculations";

interface FuelFormProps {
  inputs: FuelInputs;
  onChange: (inputs: FuelInputs) => void;
}

function NumField({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold font-mono">
        {label}
      </label>
      <input
        id={id}
        aria-label={label}
        type="number"
        min={min}
        max={max}
        step={step}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
        className="w-full font-mono font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-2 rounded-lg text-sm"
      />
    </div>
  );
}

export const FuelForm: React.FC<FuelFormProps> = ({ inputs, onChange }) => {
  return (
    <div className="space-y-4">
      {/* 1. Trip */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Fuel className="w-4 h-4 text-teal-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              Your Trip
            </span>
          </div>
          <div className="flex rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 overflow-hidden text-[10px] font-mono font-bold">
            {(["km", "mi"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => onChange({ ...inputs, distanceUnit: u })}
                aria-pressed={inputs.distanceUnit === u}
                className={`px-2.5 py-1 cursor-pointer transition-colors ${
                  inputs.distanceUnit === u
                    ? "bg-teal-500 text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {u === "km" ? "KM" : "MILES"}
              </button>
            ))}
          </div>
        </div>

        <NumField
          id="fuel-distance"
          label={`Distance (one way, ${inputs.distanceUnit})`}
          value={inputs.distance}
          min={0}
          max={100000}
          step={1}
          onChange={(v) => onChange({ ...inputs, distance: v })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange({ ...inputs, roundTrip: !inputs.roundTrip })}
            aria-pressed={inputs.roundTrip}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-bold border border-dashed cursor-pointer transition-colors ${
              inputs.roundTrip
                ? "bg-teal-500 text-white border-teal-500"
                : "text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-teal-500"
            }`}
          >
            {inputs.roundTrip ? "↔ Round trip (×2)" : "→ One way (×1)"}
          </button>
          <NumField
            id="fuel-trips"
            label="Trips per month"
            value={inputs.tripsPerMonth}
            min={0}
            max={300}
            step={1}
            onChange={(v) => onChange({ ...inputs, tripsPerMonth: v })}
          />
        </div>
      </div>

      {/* 2. Efficiency */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-teal-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              Fuel Efficiency
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NumField
            id="fuel-efficiency"
            label="Mileage"
            value={inputs.efficiency}
            min={0}
            max={500}
            step={0.1}
            onChange={(v) => onChange({ ...inputs, efficiency: v })}
          />
          <div className="space-y-1.5">
            <label htmlFor="fuel-eff-unit" className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold font-mono">
              Unit
            </label>
            <select
              id="fuel-eff-unit"
              aria-label="Efficiency unit"
              value={inputs.efficiencyUnit}
              onChange={(e) => onChange({ ...inputs, efficiencyUnit: e.target.value as FuelInputs["efficiencyUnit"] })}
              className="w-full font-mono text-xs font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-2 rounded-lg cursor-pointer"
            >
              <option value="kmpl">km per litre (km/L)</option>
              <option value="l100km">litres per 100 km</option>
              <option value="mpg_us">miles per US gallon</option>
              <option value="mpg_uk">miles per UK gallon</option>
            </select>
          </div>
        </div>
        <p className="text-[11px] font-mono text-neutral-500 leading-relaxed">
          Find it on your dashboard (average mileage) or your car&apos;s spec sheet. 15 km/L ≈ 6.7
          L/100km ≈ 35 mpg (US).
        </p>
      </div>

      {/* 3. Price & sharing */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Banknote className="w-4 h-4 text-teal-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              Fuel Price & Sharing
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NumField
            id="fuel-price"
            label="Price"
            value={inputs.fuelPrice}
            min={0}
            max={10000}
            step={0.1}
            onChange={(v) => onChange({ ...inputs, fuelPrice: v })}
          />
          <div className="space-y-1.5">
            <label htmlFor="fuel-price-unit" className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold font-mono">
              Per
            </label>
            <select
              id="fuel-price-unit"
              aria-label="Fuel price unit"
              value={inputs.fuelPriceUnit}
              onChange={(e) => onChange({ ...inputs, fuelPriceUnit: e.target.value as FuelInputs["fuelPriceUnit"] })}
              className="w-full font-mono text-xs font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-2 rounded-lg cursor-pointer"
            >
              <option value="per_litre">per litre</option>
              <option value="per_us_gallon">per US gallon</option>
              <option value="per_uk_gallon">per UK gallon</option>
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="fuel-passengers" className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold font-mono flex items-center gap-1">
            <Users className="w-3 h-3" aria-hidden="true" /> Passengers (split cost)
          </label>
          <input
            id="fuel-passengers"
            aria-label="Passengers sharing cost"
            type="number"
            min={1}
            max={50}
            step={1}
            inputMode="numeric"
            value={inputs.passengers}
            onChange={(e) => onChange({ ...inputs, passengers: Math.max(1, Math.floor(parseFloat(e.target.value) || 1)) })}
            className="w-full font-mono font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-2 rounded-lg text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export const FuelSummary: React.FC<{ inputs: FuelInputs; currency: CurrencyCode }> = ({
  inputs,
  currency,
}) => {
  const r = useMemo(() => calculateFuelCost(inputs), [inputs]);
  const sym = CURRENCIES[currency]?.symbol ?? "$";
  const fmt = (n: number) => `${sym}${n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  const distLabel = inputs.distanceUnit === "mi" ? "mi" : "km";

  return (
    <div className="space-y-4">
      <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 rounded-2xl p-5 border border-dashed border-neutral-700 dark:border-neutral-300 space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">
          <Fuel className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Total fuel cost {inputs.roundTrip ? "(round trip)" : "(one way)"}</span>
        </div>
        {r.invalid ? (
          <p className="text-xs font-mono leading-relaxed opacity-80">
            Enter a distance, mileage and fuel price above zero to see your trip cost.
          </p>
        ) : (
          <>
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight">
              {fmt(r.singleTripCost)}
            </div>
            <p className="text-xs font-mono opacity-70 leading-relaxed">
              {r.fuelNeededLitres.toFixed(2)} litres · {fmt(r.costPerKm)}/{distLabel}
              {inputs.tripsPerMonth > 0 && <> · {fmt(r.monthlyCost)}/mo</>}
            </p>
          </>
        )}
        {!r.invalid && (
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-dashed border-white/20 dark:border-neutral-950/20 text-center">
            <div>
              <div className="text-[10px] font-mono uppercase opacity-60">Fuel needed</div>
              <div className="text-sm font-mono font-bold">{r.fuelNeededLitres.toFixed(1)} L</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase opacity-60">Per {distLabel}</div>
              <div className="text-sm font-mono font-bold">{fmt(r.costPerKm)}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase opacity-60">Each person</div>
              <div className="text-sm font-mono font-bold">{fmt(r.perPersonCost)}</div>
            </div>
          </div>
        )}
      </div>

      {!r.invalid && inputs.tripsPerMonth > 0 && (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
            Monthly estimate
          </div>
          <div className="text-xl font-mono font-black text-teal-600 dark:text-teal-400">
            {fmt(r.monthlyCost)}
            <span className="text-xs font-bold text-neutral-500"> /month · {inputs.tripsPerMonth} trip{inputs.tripsPerMonth === 1 ? "" : "s"}</span>
          </div>
          <p className="text-[11px] font-mono text-neutral-500 leading-relaxed">
            {r.fuelNeededUsGallons.toFixed(2)} US gallons per trip · {fmt(r.singleTripCost)} ×{" "}
            {inputs.tripsPerMonth}.
          </p>
        </div>
      )}
    </div>
  );
};

export const FuelSeoSection: React.FC = () => {
  return (
    <article className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 text-xs font-mono overflow-hidden">
      <div className="p-4 sm:p-7 space-y-5">
        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            How Fuel Cost Is Calculated
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
            Three numbers decide any trip&apos;s fuel bill:{" "}
            <strong>fuel needed = distance ÷ mileage</strong>, then{" "}
            <strong>cost = fuel needed × price</strong>. Everything else — round trips, monthly
            commutes, splitting with passengers — is multiplication on top of that one-trip cost.
            The calculator converts km/miles, litres/gallons and km/L, L/100km or mpg automatically.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            Efficiency Units, Converted
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="text-left text-[10px] uppercase text-neutral-500 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                  <th className="py-1.5 pr-3">If your car does</th>
                  <th className="py-1.5 pr-3">That equals</th>
                  <th className="py-1.5 text-right">Per 100 km</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["20 km/L", "47 mpg (US)", "5.0 L"],
                  ["15 km/L", "35 mpg (US)", "6.7 L"],
                  ["12 km/L", "28 mpg (US)", "8.3 L"],
                  ["8 km/L", "19 mpg (US)", "12.5 L"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-dashed border-neutral-100 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-300">
                    <td className="py-1.5 pr-3 font-bold text-neutral-900 dark:text-white">{row[0]}</td>
                    <td className="py-1.5 pr-3">{row[1]}</td>
                    <td className="py-1.5 text-right">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            Fuel Cost FAQs
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">How much fuel will my trip use?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-1">
                Divide the trip distance by your mileage in matching units. 300 km at 15 km/L needs
                20 litres. With L/100km figures, multiply instead: 300 km × 6.7 ÷ 100 = 20.1 litres.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">How do I cut cost per kilometre?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-1">
                Steady highway speed, correct tyre pressure and a serviced air filter typically save
                10–15%. Splitting the ride divides the per-person cost directly — the calculator does
                this in the passengers field.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Does it work in my country?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-1">
                Yes. Enter the price in your own currency per litre or per gallon, and distances in
                km or miles. All maths runs in your browser; nothing is uploaded.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-2 text-[11px] font-mono">
          <span className="text-neutral-500">Related:</span>
          <a href="/8th-pay-commission" className="text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400">8th Pay salary →</a>
          <a href="/runway" className="text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400">Money runway →</a>
          <a href="/youtube" className="text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400">YouTube revenue →</a>
        </div>
      </div>
    </article>
  );
};
