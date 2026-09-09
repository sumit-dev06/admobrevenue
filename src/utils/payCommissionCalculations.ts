import { PayCommissionInputs, PayCommissionResults } from "../types";

// 7th CPC pay matrix Cell-1 (entry basic) per level, INR.
// Sources: 7th CPC civilian pay matrix gazette; Level 13 = 123100,
// Level 13A = 131100 ( widely-quoted entry values, cf. Mint/Times Now).
export const PAY_LEVEL_ENTRY_BASIC: Record<number, number> = {
  1: 18000,
  2: 19900,
  3: 21700,
  4: 25500,
  5: 29200,
  6: 35400,
  7: 44900,
  8: 47600,
  9: 53100,
  10: 56100,
  11: 67700,
  12: 78800,
  13: 123100,
  14: 144200,
  15: 182200,
  16: 205400,
  17: 225000,
  18: 250000,
};

export const PAY_LEVEL_LABELS: Record<number, string> = {
  1: "Level 1 · MTS / Group C",
  2: "Level 2 · Group C",
  3: "Level 3 · Group C",
  4: "Level 4 · Group C",
  5: "Level 5 · Group B/C",
  6: "Level 6 · Group B",
  7: "Level 7 · Group B",
  8: "Level 8 · Group B",
  9: "Level 9 · Group B",
  10: "Level 10 · Group A entry",
  11: "Level 11 · Group A",
  12: "Level 12 · Group A",
  13: "Level 13 · HAG",
  14: "Level 14 · HAG+",
  15: "Level 15 · Apex",
  16: "Level 16 · HAG+",
  17: "Level 17 · Apex",
  18: "Level 18 · Cabinet Secretary",
};

// HRA slabs after DA crossed 50% (7th CPC): X 30%, Y 20%, Z 10%.
export const HRA_RATES: Record<string, number> = { X: 30, Y: 20, Z: 10 };

// Commonly discussed fitment scenarios for quick comparison.
export const FITMENT_SCENARIOS = [1.92, 2.0, 2.1, 2.25, 2.57, 3.83];

export function roundTo100(n: number): number {
  return Math.round(n / 100) * 100;
}

export function calculatePayCommission(inputs: PayCommissionInputs): PayCommissionResults {
  const basic = Math.max(0, Number(inputs.currentBasic) || 0);
  const fitment = Math.max(0, Number(inputs.fitmentFactor) || 0);
  const daPct = Math.max(0, Number(inputs.currentDaPercent) || 0);
  const hraPct = HRA_RATES[inputs.hraClass] ?? 10;
  const ta = Math.max(0, Number(inputs.monthlyTa) || 0);

  // Revised basic: single multiplier, rounded to nearest 100 (pay-matrix convention).
  const revisedBasic = roundTo100(basic * fitment);

  // Current (7th CPC) monthly structure.
  const currentDa = (basic * daPct) / 100;
  const currentHra = (basic * hraPct) / 100;
  const currentTaWithDa = ta * (1 + daPct / 100);
  const currentGross = basic + currentDa + currentHra + currentTaWithDa;

  // Revised (8th CPC) structure: DA resets to 0%, so HRA/TA sit on the new basic.
  const revisedHra = (revisedBasic * hraPct) / 100;
  const revisedTa = ta; // DA component resets to zero
  const revisedGross = revisedBasic + revisedHra + revisedTa;

  const monthlyIncrease = revisedGross - currentGross;
  const percentHike = currentGross > 0 ? (monthlyIncrease / currentGross) * 100 : 0;

  // Effective hike vs basic + DA only (the Manjeet Singh Patel comparison):
  // measures how much the new basic beats what the employee already gets.
  const basicPlusDa = basic + currentDa;
  const effectiveHikeVsBasicDa =
    basicPlusDa > 0 ? ((revisedBasic - basicPlusDa) / basicPlusDa) * 100 : 0;

  const currentPension = basic * 0.5;
  const revisedPension = revisedBasic * 0.5;

  return {
    revisedBasic,
    currentDa,
    currentHra,
    currentTaWithDa,
    currentGross,
    revisedHra,
    revisedTa,
    revisedGross,
    monthlyIncrease,
    percentHike,
    effectiveHikeVsBasicDa,
    revisedPension,
    currentPension,
    arrearsPerMonth: monthlyIncrease,
  };
}

export function formatINR(n: number): string {
  return "₹" + Math.round(Number(n) || 0).toLocaleString("en-IN");
}
