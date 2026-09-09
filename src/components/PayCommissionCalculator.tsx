import React, { useMemo } from "react";
import { Landmark, SlidersHorizontal, Building2, Wallet } from "lucide-react";
import { PayCommissionInputs } from "../types";
import {
  PAY_LEVEL_ENTRY_BASIC,
  PAY_LEVEL_LABELS,
  HRA_RATES,
  FITMENT_SCENARIOS,
  calculatePayCommission,
  formatINR,
} from "../utils/payCommissionCalculations";

interface PayCommissionFormProps {
  inputs: PayCommissionInputs;
  onChange: (inputs: PayCommissionInputs) => void;
}

function NumberRow({
  id,
  label,
  value,
  min,
  max,
  step,
  sliderMax,
  onChange,
  suffix,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  sliderMax: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-mono">
        <label htmlFor={id} className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold">
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            id={id}
            aria-label={`${label} number input`}
            type="number"
            min={min}
            max={max}
            step={step}
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-32 text-right font-mono font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-0.5 rounded text-xs"
          />
          {suffix && <span className="text-[10px] font-mono text-neutral-500">{suffix}</span>}
        </div>
      </div>
      <input
        id={`${id}-slider`}
        aria-label={`${label} range slider`}
        type="range"
        min={min}
        max={sliderMax}
        step={step}
        value={Math.min(value, sliderMax)}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
      />
    </div>
  );
}

export const PayCommissionForm: React.FC<PayCommissionFormProps> = ({ inputs, onChange }) => {
  return (
    <div className="space-y-4">
      {/* 1. Pay level & current basic */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-orange-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              Pay Level & Current Basic
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">7th CPC matrix · ₹</span>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="pc-level" className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold font-mono">
            Pay Level (1–18)
          </label>
          <select
            id="pc-level"
            aria-label="Pay level"
            value={inputs.payLevel}
            onChange={(e) => {
              const lvl = parseInt(e.target.value, 10);
              onChange({ ...inputs, payLevel: lvl, currentBasic: PAY_LEVEL_ENTRY_BASIC[lvl] ?? inputs.currentBasic });
            }}
            className="w-full font-mono text-xs font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-2 rounded-lg cursor-pointer"
          >
            {Object.keys(PAY_LEVEL_ENTRY_BASIC).map((k) => {
              const lvl = parseInt(k, 10);
              return (
                <option key={lvl} value={lvl}>
                  {PAY_LEVEL_LABELS[lvl]} — {formatINR(PAY_LEVEL_ENTRY_BASIC[lvl])}
                </option>
              );
            })}
          </select>
          <p className="text-[11px] font-mono text-neutral-500 leading-relaxed">
            Selecting a level fills the entry basic of that level. Overwrite it below if you are on a higher cell.
          </p>
        </div>

        <NumberRow
          id="pc-basic"
          label="Current Basic Pay (monthly)"
          value={inputs.currentBasic}
          min={18000}
          max={300000}
          step={100}
          sliderMax={250000}
          onChange={(v) => onChange({ ...inputs, currentBasic: v })}
        />
      </div>

      {/* 2. Fitment factor */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-orange-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              Fitment Factor
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400">
            {inputs.fitmentFactor.toFixed(2)}×
          </span>
        </div>

        <NumberRow
          id="pc-fitment"
          label="Fitment Multiplier"
          value={inputs.fitmentFactor}
          min={1.5}
          max={4.0}
          step={0.01}
          sliderMax={4.0}
          onChange={(v) => onChange({ ...inputs, fitmentFactor: Math.min(4, v) })}
          suffix="×"
        />

        <div className="flex flex-wrap gap-1.5">
          {[
            { v: 1.92, tag: "Consensus" },
            { v: 2.0, tag: "Low" },
            { v: 2.1, tag: "Likely" },
            { v: 2.25, tag: "Mid" },
            { v: 2.57, tag: "7th CPC" },
            { v: 3.83, tag: "Union" },
          ].map((s) => (
            <button
              key={s.v}
              type="button"
              onClick={() => onChange({ ...inputs, fitmentFactor: s.v })}
              aria-pressed={Math.abs(inputs.fitmentFactor - s.v) < 0.005}
              className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold border border-dashed cursor-pointer transition-colors ${
                Math.abs(inputs.fitmentFactor - s.v) < 0.005
                  ? "bg-orange-500 text-white border-orange-500"
                  : "text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-orange-500"
              }`}
            >
              {s.v.toFixed(2)}× · {s.tag}
            </button>
          ))}
        </div>
        <p className="text-[11px] font-mono text-neutral-500 leading-relaxed">
          No official factor is announced (Aug 2026). 1.92× is the analyst consensus; unions demand 3.83×.
        </p>
      </div>

      {/* 3. Allowances */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-orange-500" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
              DA, HRA & Transport
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">DA resets to 0%</span>
        </div>

        <NumberRow
          id="pc-da"
          label="Current DA / DR (%)"
          value={inputs.currentDaPercent}
          min={0}
          max={100}
          step={1}
          sliderMax={80}
          onChange={(v) => onChange({ ...inputs, currentDaPercent: v })}
          suffix="%"
        />

        <div className="space-y-1.5">
          <span className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold font-mono">
            HRA City Class
          </span>
          <div className="flex gap-1.5">
            {(Object.keys(HRA_RATES) as ("X" | "Y" | "Z")[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onChange({ ...inputs, hraClass: c })}
                aria-pressed={inputs.hraClass === c}
                className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] font-mono font-bold border border-dashed cursor-pointer transition-colors ${
                  inputs.hraClass === c
                    ? "bg-orange-500 text-white border-orange-500"
                    : "text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:border-orange-500"
                }`}
              >
                {c} · {HRA_RATES[c]}%
              </button>
            ))}
          </div>
          <p className="text-[11px] font-mono text-neutral-500">X = metro · Y = large city · Z = other</p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="pc-ta" className="text-neutral-600 dark:text-neutral-400 uppercase text-[10px] font-semibold font-mono">
            Transport Allowance (base, excl. DA)
          </label>
          <select
            id="pc-ta"
            aria-label="Transport allowance base"
            value={inputs.monthlyTa}
            onChange={(e) => onChange({ ...inputs, monthlyTa: parseInt(e.target.value, 10) })}
            className="w-full font-mono text-xs font-bold text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 border border-dashed border-neutral-300 dark:border-neutral-700 px-2 py-2 rounded-lg cursor-pointer"
          >
            <option value={0}>₹0 — no TPTA</option>
            <option value={1800}>₹1,800 — Levels 1–2</option>
            <option value={3600}>₹3,600 — Levels 3–8</option>
            <option value={7200}>₹7,200 — Level 9+</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export const PayCommissionSummary: React.FC<{ inputs: PayCommissionInputs }> = ({ inputs }) => {
  const r = useMemo(() => calculatePayCommission(inputs), [inputs]);

  const scenarioRows = useMemo(
    () =>
      FITMENT_SCENARIOS.map((f) => ({
        f,
        basic: Math.round((inputs.currentBasic * f) / 100) * 100,
      })),
    [inputs.currentBasic]
  );

  const monthsSinceJan2026 = useMemo(() => {
    const now = new Date();
    return Math.max(0, (now.getFullYear() - 2026) * 12 + (now.getMonth() - 0));
  }, []);
  const arrears = r.arrearsPerMonth * monthsSinceJan2026;

  return (
    <div className="space-y-4">
      <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 rounded-2xl p-5 border border-dashed border-neutral-700 dark:border-neutral-300 space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">
          <Wallet className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Projected revised basic · {inputs.fitmentFactor.toFixed(2)}×</span>
        </div>
        <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight">
          {formatINR(r.revisedBasic)}
          <span className="text-sm font-bold opacity-60"> /mo</span>
        </div>
        <p className="text-xs font-mono opacity-70 leading-relaxed">
          vs {formatINR(inputs.currentBasic)} now ·{" "}
          <span className={r.monthlyIncrease >= 0 ? "text-emerald-400" : ""}>
            {r.monthlyIncrease >= 0 ? "+" : ""}
            {formatINR(r.monthlyIncrease)}/mo gross ({r.percentHike >= 0 ? "+" : ""}
            {r.percentHike.toFixed(1)}%)
          </span>
        </p>
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-dashed border-white/20 dark:border-neutral-950/20 text-center">
          <div>
            <div className="text-[10px] font-mono uppercase opacity-60">New gross</div>
            <div className="text-sm font-mono font-bold">{formatINR(r.revisedGross)}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase opacity-60">New pension</div>
            <div className="text-sm font-mono font-bold">{formatINR(r.revisedPension)}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase opacity-60">Arrears ≈</div>
            <div className="text-sm font-mono font-bold">{formatINR(arrears)}</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
        <div className="pb-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
          <span className="text-xs font-mono font-bold uppercase text-neutral-900 dark:text-white">
            Basic pay at every fitment factor
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="text-left text-[10px] uppercase text-neutral-500 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                <th className="py-1.5 pr-3">Fitment</th>
                <th className="py-1.5 text-right">Revised basic</th>
              </tr>
            </thead>
            <tbody>
              {scenarioRows.map((s) => (
                <tr
                  key={s.f}
                  className={`border-b border-dashed border-neutral-100 dark:border-neutral-800/60 ${
                    Math.abs(s.f - inputs.fitmentFactor) < 0.005
                      ? "text-neutral-900 dark:text-white font-bold"
                      : "text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  <td className="py-1.5 pr-3">{s.f.toFixed(2)}×</td>
                  <td className="py-1.5 text-right">{formatINR(s.basic)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] font-mono text-neutral-500 leading-relaxed">
          Current: basic {formatINR(inputs.currentBasic)} + DA {formatINR(r.currentDa)} + HRA{" "}
          {formatINR(r.currentHra)} + TA {formatINR(r.currentTaWithDa)} = {formatINR(r.currentGross)}.
          Revised DA resets to 0%; HRA {formatINR(r.revisedHra)} on the new basic.
        </p>
      </div>
    </div>
  );
};

export const PayCommissionSeoSection: React.FC = () => {
  return (
    <article className="bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 text-xs font-mono overflow-hidden">
      <div className="p-4 sm:p-7 space-y-5">
        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            How the 8th Pay Commission Salary Math Works
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
            A Pay Commission revises salaries with one multiplier — the{" "}
            <strong>fitment factor</strong>:{" "}
            <strong>revised basic = current basic × fitment factor</strong>, rounded to the
            nearest ₹100. Your existing Dearness Allowance is absorbed into the new basic and DA
            resets to 0%. That is why a 1.92× factor does not mean a 92% hike: at 60% DA you
            already receive 1.60× your basic every month.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            Status in September 2026: Projections, Not Official Figures
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
            <li>Cabinet approved the 8th CPC in Jan 2025; constituted 3 Nov 2025 under Justice Ranjana Prakash Desai.</li>
            <li>Reference date for revised pay: <strong>1 Jan 2026</strong> — arrears accrue from that date.</li>
            <li>Report expected <strong>mid-2027</strong> (18-month mandate), then Cabinet approval.</li>
            <li>Analyst consensus ≈ <strong>1.92×</strong>; 7th CPC used 2.57×; unions demand 3.83× (₹69,000 minimum).</li>
            <li>Current DA/DR: <strong>60%</strong> (2% hike effective 1 Jan 2026).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            Why a Lower Fitment Can Still Mean a Bigger Hike
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
            Compare the new basic against <strong>basic + DA</strong>, not basic alone. At 2.1×, a
            ₹18,000 basic becomes ₹37,800 against ₹28,440 already received (basic + 58% DA) — about
            a 33% effective gain on that component, and roughly 53% on the illustrated total in
            employee-body calculations, versus ~32% under the 7th CPC. The calculator shows this
            effective figure for your own inputs.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-xl font-black text-neutral-950 dark:text-white mb-2 leading-snug">
            8th Pay Commission FAQs
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">What is the fitment factor?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-1">
                The single multiplier converting 7th CPC basic pay into 8th CPC basic pay. 6th CPC
                used 1.86×, 7th CPC 2.57×. The 8th CPC factor is not yet decided; estimates range
                1.92×–2.86×.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">When will it be implemented?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-1">
                Revised pay is referenced to 1 Jan 2026, but actual payout follows the
                Commission&apos;s report (expected mid-2027) and Cabinet approval, with arrears for
                the gap — as with the 7th CPC.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">What happens to DA, HRA and pension?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-1">
                DA resets to 0% on the new basic. HRA continues at X/Y/Z slabs (30/20/10%) on the
                revised basic. Pension is refixed at 50% of revised basic with DR reset likewise.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Is this official?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs mt-1">
                No. This tool applies the publicly discussed formula to your numbers for planning.
                Verify the final factor against a PIB release once notified.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-2 text-[11px] font-mono">
          <span className="text-neutral-500">Related:</span>
          <a href="/runway" className="text-neutral-700 dark:text-neutral-300 hover:text-orange-600 dark:hover:text-orange-400">Money runway →</a>
          <a href="/fuel-cost-calculator" className="text-neutral-700 dark:text-neutral-300 hover:text-orange-600 dark:hover:text-orange-400">Fuel cost →</a>
          <a href="/adsense" className="text-neutral-700 dark:text-neutral-300 hover:text-orange-600 dark:hover:text-orange-400">AdSense RPM →</a>
        </div>
      </div>
    </article>
  );
};
