import React, { useMemo, useState } from "react";
import { RunwayInputs, CurrencyCode } from "../types";
import { CURRENCIES } from "../data/geoTiers";
import {
  calculateRunway,
  formatRunwayMoney,
  compactRunway,
  yearsAndMonths,
} from "../utils/runwayCalculations";
import "./RunwayZip.css";

interface RunwayZipProps {
  inputs: RunwayInputs;
  onChange: (inputs: RunwayInputs) => void;
  currency: CurrencyCode;
  onCurrencyChange?: (code: CurrencyCode) => void;
}

function unitOptionsFor(currency: CurrencyCode) {
  return currency === "INR"
    ? [
        { label: "L", size: 100000 },
        { label: "Cr", size: 10000000 },
      ]
    : [
        { label: "K", size: 1000 },
        { label: "M", size: 1000000 },
        { label: "B", size: 1000000000 },
      ];
}

/** Horizontal runway timeline — ported from moneyCalucator.zip (green → amber track, year ticks). */
const RunwayTimeline: React.FC<{ months: number | null; neverDepletes: boolean; invalid: boolean }> = ({
  months,
  neverDepletes,
  invalid,
}) => {
  const W = 1000;
  const H = 150;
  const padL = 30;
  const padR = 30;
  const trackY = 62;
  const trackH = 30;
  const trackW = W - padL - padR;

  let displayYears: number;
  if (invalid) displayYears = 10;
  else if (neverDepletes) displayYears = 25;
  else displayYears = Math.min(60, Math.max(1, Math.ceil(((months ?? 0) / 12) * 1.15)));

  const displayMonths = displayYears * 12;
  const tickStep = displayYears <= 10 ? 1 : displayYears <= 30 ? 5 : 10;
  const ticks: number[] = [];
  for (let y = 0; y <= displayYears; y += tickStep) ticks.push(y);
  if (ticks[ticks.length - 1] !== displayYears) {
    const last = ticks[ticks.length - 1];
    if (displayYears - last < tickStep * 0.7) ticks[ticks.length - 1] = displayYears;
    else ticks.push(displayYears);
  }

  const monthsFraction = !invalid && !neverDepletes ? Math.min(1, (months ?? 0) / displayMonths) : 1;
  const endX = padL + monthsFraction * trackW;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Financial runway timeline">
      <defs>
        <linearGradient id="rz-runway-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--rz-green)" />
          <stop offset="100%" stopColor={neverDepletes ? "var(--rz-green)" : "var(--rz-amber)"} />
        </linearGradient>
      </defs>
      <rect x={padL} y={trackY} width={trackW} height={trackH} rx={8} fill="var(--rz-surface-2)" stroke="var(--rz-border)" />
      <line
        x1={padL + 10}
        x2={padL + trackW - 10}
        y1={trackY + trackH / 2}
        y2={trackY + trackH / 2}
        stroke="var(--rz-border)"
        strokeWidth={2}
        strokeDasharray="10 8"
      />
      {!invalid && (
        <rect x={padL} y={trackY} width={Math.max(0, endX - padL)} height={trackH} rx={8} fill="url(#rz-runway-grad)" opacity={0.85} />
      )}
      <circle cx={padL} cy={trackY + trackH / 2} r={6} fill="var(--rz-green)" stroke="var(--rz-bg)" strokeWidth={2} />
      {neverDepletes && (
        <g>
          <polygon
            points={`${padL + trackW - 4},${trackY + trackH / 2 - 10} ${padL + trackW + 14},${trackY + trackH / 2} ${padL + trackW - 4},${trackY + trackH / 2 + 10}`}
            fill="var(--rz-green)"
          />
          <text x={padL + trackW - 20} y={trackY - 12} textAnchor="end" fontSize={13} fontFamily="IBM Plex Mono, monospace" fill="var(--rz-green)">
            keeps going →
          </text>
        </g>
      )}
      {!invalid && !neverDepletes && (
        <g>
          <circle cx={endX} cy={trackY + trackH / 2} r={7} fill="var(--rz-amber)" stroke="var(--rz-bg)" strokeWidth={2} />
          <text
            x={Math.min(Math.max(endX, padL + 60), padL + trackW - 10)}
            y={trackY - 12}
            textAnchor="middle"
            fontSize={13}
            fontFamily="IBM Plex Mono, monospace"
            fill="var(--rz-amber)"
          >
            ends here
          </text>
        </g>
      )}
      {ticks.map((y) => {
        const x = padL + (y / displayYears) * trackW;
        return (
          <g key={y}>
            <line x1={x} x2={x} y1={trackY + trackH + 4} y2={trackY + trackH + 10} stroke="var(--rz-text-dim)" strokeWidth={1} />
            <text x={x} y={trackY + trackH + 12 + 12} textAnchor="middle" fontSize={12} fontFamily="IBM Plex Mono, monospace" fill="var(--rz-text-dim)">
              {y}y
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const RunwayZipCalculator: React.FC<RunwayZipProps> = ({
  inputs,
  onChange,
  currency,
  onCurrencyChange,
}) => {
  const [principalUnit, setPrincipalUnit] = useState<{ label: string; size: number } | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const [ignoreMinimum, setIgnoreMinimum] = useState(false);

  const results = useMemo(
    () => calculateRunway(inputs, { ignoreMinimum }),
    [inputs, ignoreMinimum]
  );

  const sym = CURRENCIES[currency]?.symbol ?? "$";
  const fmt = (n: number) => formatRunwayMoney(n, currency);
  const isPercent = inputs.increaseMode === "percent";

  const unitOptions = unitOptionsFor(currency);
  const displayPrincipal = principalUnit ? inputs.principal / principalUnit.size : inputs.principal;

  const setUnit = (unit: { label: string; size: number } | null) => {
    setPrincipalUnit(unit);
  };

  const escNum = Math.max(0, Number(inputs.yearlyIncrease) || 0);
  const escSummary =
    escNum === 0 ? "" : isPercent ? `rising ${escNum}% a year` : `rising ${fmt(escNum)} a year`;

  const durationClass =
    "rz-duration" + (results.overdraw ? " rz-question" : results.invalid ? " rz-dim" : results.neverDepletes ? " rz-green" : "");

  const rateNum = Number(inputs.annualReturn) || 0;
  let breakevenValue: string;
  let breakevenDesc: string;
  if (rateNum <= 0) {
    breakevenValue = "any withdrawal at all";
    breakevenDesc = `At ${rateNum}% annual return, ${fmt(inputs.principal)} earns no interest to offset withdrawals, so the balance falls by the full amount you take out each month and will always reach zero.`;
  } else if (escNum > 0) {
    breakevenValue = "no amount is safe forever";
    breakevenDesc = `At ${rateNum}% annual return, ${fmt(inputs.principal)} earns about ${fmt(results.breakeven)} a month in interest. Because your withdrawal is ${escSummary}, it will eventually overtake that interest no matter how small it starts, so the balance always reaches zero. Set the yearly increase to zero to see the withdrawal that could last forever.`;
  } else {
    breakevenValue = `more than ${fmt(results.breakeven)} / month`;
    breakevenDesc = `At ${rateNum}% annual return, ${fmt(inputs.principal)} earns about ${fmt(results.breakeven)} a month in interest. Withdraw more than that and the balance eventually hits zero. Withdraw that amount or less, and the interest can keep pace forever.`;
  }

  const showTable = !results.invalid && !results.neverDepletes && results.rows.length > 0;
  const MONTH_ROW_CAP = 1200;
  const monthEntries = useMemo(() => {
    if (viewMode !== "month") return [];
    return results.rows.slice(0, MONTH_ROW_CAP).map((r) => ({
      period: `Y${Math.floor((r.month - 1) / 12) + 1}M${((r.month - 1) % 12) + 1}`,
      startBalance: r.startBalance,
      interest: r.interest,
      withdrawal: r.withdrawal,
      endBalance: r.endBalance,
    }));
  }, [results.rows, viewMode]);
  const yearEntries = useMemo(() => {
    if (viewMode !== "year") return [];
    return results.yearly.map((y) => ({
      period: `Y${y.year}`,
      startBalance: y.startBalance,
      interest: y.interest,
      withdrawal: y.withdrawn,
      endBalance: y.endBalance,
    }));
  }, [results.yearly, viewMode]);
  const entries = viewMode === "month" ? monthEntries : yearEntries;

  const escText =
    escNum === 0 ? "none" : isPercent ? `+${escNum}% a year` : `+${fmt(escNum)} a year`;
  const printMeta =
    `Starting balance ${fmt(inputs.principal)}  ·  Annual return ${rateNum}%` +
    `  ·  Monthly withdrawal ${fmt(inputs.monthlyWithdrawal)}` +
    `  ·  Yearly increase ${escText}` +
    `  ·  Estimated runway ${yearsAndMonths(results.months)}\n` +
    `Generated ${new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}`;

  return (
    <div className="runway-zip">
      {/* Eyebrow + in-page nav (zip topbar equivalent; global navbar stays above) */}
      <div className="runway-zip-no-print">
        <span className="rz-eyebrow">Runway</span>
        <nav className="rz-jumpnav" aria-label="On this page">
          <a href="#rz-guide" className="rz-nav-jump">How it works</a>
          <a href="#rz-faq" className="rz-nav-jump">FAQ</a>
        </nav>
      </div>

      <h1 className="rz-h1">
        How long will your money <em>last?</em>
      </h1>
      <p className="rz-sub">
        Enter your balance, expected return, and monthly withdrawal to estimate your financial runway.
      </p>

      {/* Inputs */}
      <div className="rz-inputs runway-zip-no-print">
        <div className="rz-field">
          <label htmlFor="rz-principal">Principal</label>
          <div className="rz-field-box">
            <span className="rz-affix">{sym}</span>
            <input
              type="number"
              id="rz-principal"
              aria-label="Principal amount"
              value={Number.isFinite(displayPrincipal) ? displayPrincipal : 0}
              min={0}
              step={principalUnit ? 0.1 : 10000}
              onChange={(e) => {
                const raw = parseFloat(e.target.value) || 0;
                const eff = principalUnit ? raw * principalUnit.size : raw;
                if (eff >= 1000) setIgnoreMinimum(false);
                onChange({ ...inputs, principal: Math.max(0, eff) });
              }}
            />
            <span className="rz-approx">{compactRunway(inputs.principal, currency)}</span>
          </div>
          <div className="rz-unit-toggle" role="group" aria-label="Multiply the amount you type">
            {unitOptions.map((u) => {
              const active = !!principalUnit && principalUnit.label === u.label;
              return (
                <button
                  key={u.label}
                  type="button"
                  aria-pressed={active}
                  title={active ? `Turn off ${u.label}` : `Type in ${u.label}`}
                  onClick={() => setUnit(active ? null : u)}
                >
                  {u.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rz-field">
          <label htmlFor="rz-rate">Annual return</label>
          <div className="rz-field-box">
            <input
              type="number"
              id="rz-rate"
              aria-label="Annual return percent"
              value={inputs.annualReturn}
              min={0}
              onChange={(e) => onChange({ ...inputs, annualReturn: Math.max(0, parseFloat(e.target.value) || 0) })}
            />
            <span className="rz-affix">%</span>
          </div>
        </div>

        <div className="rz-field">
          <label htmlFor="rz-withdrawal">Monthly withdrawal</label>
          <div className="rz-field-box">
            <span className="rz-affix">{sym}</span>
            <input
              type="number"
              id="rz-withdrawal"
              aria-label="Monthly withdrawal amount"
              value={inputs.monthlyWithdrawal}
              min={0}
              step={500}
              onChange={(e) => onChange({ ...inputs, monthlyWithdrawal: Math.max(0, parseFloat(e.target.value) || 0) })}
            />
            <span className="rz-approx">{compactRunway(inputs.monthlyWithdrawal, currency)}</span>
          </div>
        </div>

        <div className="rz-field">
          <label htmlFor="rz-escalation">Yearly increase</label>
          <div className="rz-field-box">
            <span className="rz-affix">{isPercent ? "%" : sym}</span>
            <input
              type="number"
              id="rz-escalation"
              aria-label="Yearly increase"
              value={inputs.yearlyIncrease}
              min={0}
              step={isPercent ? 1 : 500}
              onChange={(e) => onChange({ ...inputs, yearlyIncrease: Math.max(0, parseFloat(e.target.value) || 0) })}
            />
            <span className="rz-approx">
              {escNum === 0 ? "flat" : isPercent ? `+${escNum}%/yr` : `+${compactRunway(escNum, currency)}/yr`}
            </span>
          </div>
          <div className="rz-unit-toggle" role="group" aria-label="Yearly increase type">
            <button
              type="button"
              aria-pressed={isPercent}
              title="Increase by a percentage each year"
              onClick={() => onChange({ ...inputs, increaseMode: "percent" })}
            >
              %
            </button>
            <button
              type="button"
              aria-pressed={!isPercent}
              title="Increase by a fixed amount each year"
              onClick={() => onChange({ ...inputs, increaseMode: "amount" })}
            >
              {sym}
            </button>
          </div>
        </div>
      </div>

      {/* Currency quick switch (zip currency-picker equivalent; app has 9 currencies) */}
      {onCurrencyChange && (
        <div className="rz-currency-row runway-zip-no-print" role="group" aria-label="Currency">
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
            <button
              key={code}
              type="button"
              aria-pressed={currency === code}
              onClick={() => {
                setPrincipalUnit(null);
                onCurrencyChange(code);
              }}
            >
              {CURRENCIES[code].symbol} {code}
            </button>
          ))}
        </div>
      )}

      {/* Result card */}
      <div className="rz-card runway-zip-no-print">
        <div className="rz-result" aria-live="polite">
          <div className="rz-label">Estimated runway</div>
          <div className={durationClass}>
            {results.overdraw
              ? `Can you withdraw ${fmt(inputs.monthlyWithdrawal)} from ${fmt(inputs.principal)}?`
              : results.tooSmall
                ? "You should earn more first"
                : results.invalid
                  ? "Add a withdrawal"
                  : results.neverDepletes
                    ? "Does not run out"
                    : yearsAndMonths(results.months)}
          </div>
          <div className="rz-context">
            {results.overdraw
              ? "your monthly withdrawal is larger than your entire balance"
              : results.tooSmall
                ? `a balance under ${fmt(1000)} is too small to project a runway`
                : results.invalid
                  ? "enter a monthly withdrawal to calculate your runway"
                  : results.neverDepletes
                    ? "your estimated returns keep pace with withdrawals"
                    : escSummary
                      ? `until your balance reaches zero, with withdrawals ${escSummary}`
                      : "until your balance reaches zero"}
          </div>
          {results.tooSmall && (
            <button type="button" className="rz-anyway-btn" onClick={() => setIgnoreMinimum(true)}>
              Calculate anyway
            </button>
          )}
        </div>
        {!results.overdraw && (
          <RunwayTimeline months={results.months} neverDepletes={results.neverDepletes} invalid={results.invalid} />
        )}
      </div>

      {/* Breakeven */}
      {!results.tooSmall && !results.overdraw && (
        <div className="rz-breakeven runway-zip-no-print">
          <div className="rz-bar" />
          <div>
            <div className="rz-breakeven-label">Minimum to ever deplete</div>
            <div className="rz-breakeven-value">{breakevenValue}</div>
            <div className="rz-breakeven-desc">
              <span>{breakevenDesc} </span>
              {escNum === 0 && rateNum > 0 && (
                <button
                  type="button"
                  onClick={() => onChange({ ...inputs, monthlyWithdrawal: Math.ceil(results.breakeven) + 1 })}
                >
                  See what happens right at the edge
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Breakdown table */}
      {showTable && (
        <div>
          <div className="rz-print-header" aria-hidden="true">
            <div className="rz-print-title">
              Runway report — {viewMode === "month" ? "month by month" : "year by year"}
            </div>
            <div className="rz-print-meta">{printMeta}</div>
          </div>
          <div className="rz-table-bar">
            <div className="rz-view-toggle" role="group" aria-label="Breakdown interval">
              <button type="button" aria-pressed={viewMode === "month"} onClick={() => setViewMode("month")}>
                Month by month
              </button>
              <button type="button" aria-pressed={viewMode === "year"} onClick={() => setViewMode("year")}>
                Year by year
              </button>
            </div>
            <button type="button" className="rz-print-btn runway-zip-no-print" title="Print or save this breakdown as a PDF" onClick={() => window.print()}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9V3h12v6" />
                <path d="M6 18H4a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2" />
                <rect x="6" y="14" width="12" height="7" rx="1" />
              </svg>
              <span>Print</span>
            </button>
          </div>
          <div className="rz-table-card">
            <div className="rz-table-scroll">
              <div className="rz-table-head">
                <div>{viewMode === "month" ? "Month" : "Year"}</div>
                <div>Start</div>
                <div><span className="rz-lbl-full">+ Interest</span><span className="rz-lbl-short">+ Int</span></div>
                <div><span className="rz-lbl-full">− Withdrawal</span><span className="rz-lbl-short">− W/D</span></div>
                <div>End</div>
              </div>
              <div className="rz-table-body">
                {entries.map((e) => (
                  <div key={e.period} className={"rz-table-row" + (e.endBalance <= 0 ? " rz-row-depleted" : "")}>
                    <div className="rz-col-dim">{e.period}</div>
                    <div>{fmt(e.startBalance)}</div>
                    <div className="rz-col-green">+{fmt(e.interest)}</div>
                    <div className="rz-col-rust">−{fmt(e.withdrawal)}</div>
                    <div className="rz-col-end">{fmt(Math.max(e.endBalance, 0))}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {viewMode === "month" && results.rows.length > MONTH_ROW_CAP && (
            <p className="rz-footnote runway-zip-no-print">
              Showing the first {MONTH_ROW_CAP.toLocaleString()} months of {results.rows.length.toLocaleString()}.
              Switch to year-by-year for the full schedule.
            </p>
          )}
        </div>
      )}

      <div className="rz-footnote runway-zip-no-print">
        Assumes a fixed annual return applied monthly and a fixed monthly withdrawal — real returns
        vary year to year. For planning only, not financial advice.
      </div>

      {/* Mobile contents strip */}
      <nav className="rz-contents-strip runway-zip-no-print" aria-label="On this page">
        <span>On this page:</span>
        <a href="#rz-guide">How it works</a>
        <a href="#rz-examples">Examples</a>
        <a href="#rz-assumptions">Assumptions</a>
        <a href="#rz-faq">FAQ</a>
      </nav>
    </div>
  );
};

/** Full editorial guide — content mirrored from moneyCalucator.zip (kept, SEO untouched). */
export const RunwayZipSeo: React.FC = () => {
  return (
    <div className="runway-zip">
      <section className="rz-prose" id="rz-guide">
        <h2>How long will your money last?</h2>
        <p>
          If you stop earning tomorrow and live off your savings, the only question that matters is
          how many months the balance survives. That span is your <strong>financial runway</strong> —
          a term borrowed from startups, where runway means the time before the bank account hits zero.
        </p>
        <p>
          Three numbers decide it: how much you have, what return it earns, and how much you take out
          each month. The calculator above runs the arithmetic month by month and tells you the answer
          in years and months, then shows you every step so you can see exactly where the money goes.
        </p>

        <h2>How this calculator works</h2>
        <p>
          There is no hidden model and no guesswork. Each month, the balance earns one-twelfth of the
          annual return, then your withdrawal is subtracted. The result carries into the next month,
          which is why the interest shrinks as the balance falls.
        </p>
        <span className="rz-formula">monthly rate    = annual return ÷ 12
interest        = balance × monthly rate
closing balance = balance + interest − withdrawal</span>
        <p>
          That loop repeats until the balance reaches zero, and the number of loops is your runway.
          Because interest is applied monthly rather than annually, the figures match how a bank or
          debt fund actually credits returns.
        </p>
        <p>
          One consequence is worth noticing. If your monthly interest is larger than your withdrawal,
          the balance grows instead of shrinking and the money never runs out. The calculator reports
          that as <strong>&quot;Does not run out&quot;</strong> and shows you the exact withdrawal at which the
          outcome flips.
        </p>

        <h2>The number that decides everything is a ratio, not an amount</h2>
        <p>
          People assume a bigger balance means a longer runway. It does not, on its own. What
          determines the answer is your withdrawal as a proportion of your balance.
        </p>
        <p>
          At an 8% annual return, ₹1 crore withdrawing ₹1,00,000 a month and ₹25 lakh withdrawing
          ₹25,000 a month both last <strong>13 years and 10 months</strong>. Identical runways, four
          times the money. The ratio is the same, so the outcome is the same.
        </p>
        <p>
          This is why cutting your monthly withdrawal is far more powerful than most people expect.
          It moves the same lever as multiplying your savings.
        </p>
        <p>
          Because it is a ratio, the answer does not care which currency you use. A balance of{" "}
          <strong>100 times your monthly withdrawal</strong>, earning 8% a year, lasts{" "}
          <strong>13 years and 10 months</strong> — whether that is ₹1 crore against ₹1,00,000 a month,
          $1,000,000 against $10,000 a month, or £250,000 against £2,500 a month. Same multiple, same
          runway, every time.
        </p>
        <p>
          That leads to a rule worth remembering. To live on the interest alone and never touch the
          balance, you need <strong>1,200 ÷ your annual return percent</strong> times your monthly
          withdrawal:
        </p>
        <table className="rz-prose-table">
          <thead>
            <tr><th>Annual return</th><th>Balance needed</th><th>If you withdraw 3,000 a month</th></tr>
          </thead>
          <tbody>
            <tr><td>4%</td><td>300× monthly withdrawal</td><td>900,000</td></tr>
            <tr><td>6%</td><td>200× monthly withdrawal</td><td>600,000</td></tr>
            <tr><td>8%</td><td>150× monthly withdrawal</td><td>450,000</td></tr>
            <tr><td>10%</td><td>120× monthly withdrawal</td><td>360,000</td></tr>
            <tr><td>12%</td><td>100× monthly withdrawal</td><td>300,000</td></tr>
          </tbody>
        </table>
        <p>
          The right-hand column deliberately carries no currency symbol — it holds for rupees, dollars,
          pounds or euros without alteration. Fall below that multiple and your runway becomes finite;
          the calculator shows you exactly how finite.
        </p>

        <h2 id="rz-examples">How long will ₹1 crore last?</h2>
        <p>
          The most common version of this question in India. The answer depends entirely on the
          monthly withdrawal, and the cliff edge is sharper than people expect:
        </p>
        <table className="rz-prose-table">
          <thead>
            <tr><th>Balance</th><th>Return</th><th>Monthly withdrawal</th><th>How long it lasts</th></tr>
          </thead>
          <tbody>
            <tr><td>₹1 crore</td><td>8%</td><td>₹50,000</td><td>Never runs out</td></tr>
            <tr><td>₹1 crore</td><td>8%</td><td>₹66,667</td><td>Never runs out (breakeven)</td></tr>
            <tr><td>₹1 crore</td><td>8%</td><td>₹1,00,000</td><td>13 years, 10 months</td></tr>
            <tr><td>₹50 lakh</td><td>7%</td><td>₹40,000</td><td>18 years, 9 months</td></tr>
            <tr><td>₹25 lakh</td><td>8%</td><td>₹25,000</td><td>13 years, 10 months</td></tr>
          </tbody>
        </table>
        <p>
          Notice the jump between rows two and three. At ₹66,667 a month the money lasts forever; at
          ₹1,00,000 it is gone inside fourteen years. A 50% increase in spending does not cut the
          runway by half — it collapses it from infinite to finite. That threshold is the breakeven
          figure the calculator shows you, and it equals your balance times the annual return, divided
          by twelve.
        </p>

        <h2 id="rz-million">How long will $1 million last?</h2>
        <p>
          The same question, asked in dollars. Retirement guidance in the US and UK usually assumes a
          lower return than Indian investors are used to, so these examples use 6–7%:
        </p>
        <table className="rz-prose-table">
          <thead>
            <tr><th>Balance</th><th>Return</th><th>Monthly withdrawal</th><th>How long it lasts</th></tr>
          </thead>
          <tbody>
            <tr><td>$1,000,000</td><td>7%</td><td>$5,000</td><td>Never runs out</td></tr>
            <tr><td>$1,000,000</td><td>7%</td><td>$8,000</td><td>18 years, 9 months</td></tr>
            <tr><td>$1,000,000</td><td>7%</td><td>$10,000</td><td>12 years, 7 months</td></tr>
            <tr><td>$500,000</td><td>6%</td><td>$4,000</td><td>16 years, 5 months</td></tr>
            <tr><td>$250,000</td><td>6%</td><td>$2,000</td><td>16 years, 5 months</td></tr>
          </tbody>
        </table>
        <p>
          The last two rows repeat the lesson from the ratio section: half the balance and half the
          withdrawal produce exactly the same runway. And note the first row — $5,000 a month from
          $1,000,000 at 7% never depletes, because the breakeven withdrawal at that rate is $5,833.
          Between $5,000 and $8,000 a month lies the difference between a permanent income and one that
          ends before you turn 70.
        </p>
        <p>
          The calculator handles any currency: pick yours from the selector above. Amounts, grouping
          and the shorthand units all adjust — lakh and crore for India, thousands and millions elsewhere.
        </p>

        <h2>What is an SWP, and is this an SWP calculator?</h2>
        <p>
          A <strong>Systematic Withdrawal Plan</strong> is the mirror image of an SIP. Instead of
          putting a fixed amount in every month, you take a fixed amount out while the remainder stays
          invested. Retirees in India commonly set one up against a debt or hybrid mutual fund to
          create a monthly income.
        </p>
        <p>
          The arithmetic of an SWP is exactly what this tool computes, so yes — you can use it as an
          SWP calculator. Enter your corpus, the return you expect from the fund, and the monthly
          withdrawal, and the month-by-month table shows the same depletion schedule the fund house
          would produce. Two differences to keep in mind: an actual SWP redeems units at a fluctuating
          NAV rather than earning a smooth monthly return, and redemptions attract capital gains tax
          that this calculator does not model.
        </p>

        <h2>The 4% rule, and why it travels badly to India</h2>
        <p>
          You will run into the 4% rule in any discussion of retirement withdrawals. It comes from
          research on US market history and suggests withdrawing 4% of your starting portfolio in year
          one, then raising that amount with inflation each year, to survive a 30-year retirement.
        </p>
        <p>
          Two reasons to be careful with it here. It was calibrated on US stock and bond returns over
          a specific historical window, and Indian inflation has generally run higher than the US
          figures the rule assumed — which shortens how far a fixed real withdrawal stretches.
        </p>
        <p>
          This calculator can model either behaviour. Leave the <strong>yearly increase</strong> at
          zero and your withdrawal stays fixed in rupees, which matches how a fixed SWP mandate
          actually behaves. Set it to your expected inflation rate and the withdrawal rises each year
          the way the 4% rule intends, so the runway reflects constant purchasing power rather than
          constant rupees. The second is more realistic and always produces a shorter runway.
        </p>

        <h2 id="rz-assumptions">What this calculator assumes, and where it breaks down</h2>
        <p>
          Being clear about limits matters more than looking precise. This model deliberately keeps
          four things simple, and each one is a real-world risk it does not capture:
        </p>
        <ul>
          <li>
            <strong>Returns are steady.</strong> Real markets deliver 14% one year and −6% the next.
            A fixed rate cannot show <em>sequence risk</em> — a bad run early in retirement damages a
            portfolio far more than the same run later, even with identical average returns.
          </li>
          <li>
            <strong>Withdrawals change only on a yearly schedule.</strong> You can set a yearly
            increase to model inflation, but it steps up once a year by a fixed rule. It cannot
            anticipate the medical bill or wedding that arrives outside the monthly budget.
          </li>
          <li>
            <strong>Tax is ignored.</strong> Interest income and capital gains are both taxable in
            India, and the rate depends on the instrument and your holding period. Your spendable
            amount is lower than the gross figures shown.
          </li>
          <li>
            <strong>Nothing is added.</strong> No pension, rental income, or salary — this is a pure
            drawdown from a single pot.
          </li>
        </ul>
        <p>
          Treat the result as a clear answer to a simplified question, not a forecast. Its real value
          is comparison: seeing what happens when you withdraw ₹10,000 less, or when the return is 7%
          instead of 10%.
        </p>

        <h2>Who this is for</h2>
        <ul>
          <li><strong>People planning retirement</strong> checking whether a corpus supports the monthly income they need</li>
          <li><strong>Anyone taking a career break</strong> — sabbatical, study, caregiving — who needs to know how many months of freedom the savings buy</li>
          <li><strong>Freelancers and consultants</strong> sizing an emergency buffer between contracts</li>
          <li><strong>Founders</strong> working out personal runway while a business is pre-revenue</li>
          <li><strong>Anyone weighing an early exit</strong> against the arithmetic of living off savings</li>
          <li><strong>SWP investors</strong> checking how long a mutual fund corpus sustains a fixed monthly redemption</li>
        </ul>

        <h2 id="rz-faq">Frequently asked questions</h2>

        <h3>How long will my money last if I withdraw every month?</h3>
        <p>
          It depends on the ratio of your withdrawal to your balance and the return you earn. Enter
          all three numbers above for an exact answer in years and months. As a reference point, a
          balance earning 8% a year supports a monthly withdrawal of about 0.67% of that balance
          indefinitely; anything above that will eventually exhaust it.
        </p>

        <h3>What return should I enter?</h3>
        <p>
          Use the return you realistically expect from where the money actually sits, not a hoped-for
          number. A savings account, a fixed deposit, a debt fund and an equity fund have very
          different expectations and very different risk. If you are unsure, run the calculation twice
          — once optimistic, once pessimistic — and plan against the lower figure.
        </p>

        <h3>Does the calculator account for inflation?</h3>
        <p>
          Yes, optionally. Set a <strong>yearly increase</strong> and your withdrawal steps up at the
          start of every year — either by a percentage, which is how you model inflation, or by a fixed
          amount. Leave it at zero and the withdrawal stays flat in nominal terms.
        </p>
        <p>
          The effect is larger than most people expect. ₹1 crore at 8% withdrawing ₹50,000 a month
          never runs out while the withdrawal stays flat, because the interest covers it. Add a 6%
          yearly increase and the same balance is exhausted in <strong>21 years and 6 months</strong>.
          Nothing changed except keeping up with rising costs.
        </p>
        <p>
          An alternative approach is to enter a <em>real</em> return instead: subtract expected
          inflation from your expected return, so 9% growth with 5% inflation becomes 4%. The runway
          then represents purchasing power rather than rupees.
        </p>

        <h3>What does &quot;does not run out&quot; mean?</h3>
        <p>
          Your monthly interest equals or exceeds your withdrawal, so the balance stops falling. In
          that case the calculator shows the breakeven withdrawal — the exact monthly figure at which
          the balance would start depleting.
        </p>

        <h3>Is my data sent anywhere?</h3>
        <p>
          No. Every calculation runs in your browser. The numbers you type are never transmitted to a
          server, and nothing is stored except your currency preference, which stays on your own device.
        </p>

        <h3>Can I use this for currencies other than rupees?</h3>
        <p>
          Yes. The currency selector above covers the major world currencies with correct symbols and
          local number formatting — Indian grouping with lakh and crore for rupees, thousands grouping
          with K, M and B elsewhere.
        </p>

        <h3>Is this financial advice?</h3>
        <p>
          No. It is an arithmetic tool. It applies a formula to numbers you supply and shows the
          result, with no knowledge of your tax situation, obligations, or goals. For decisions that
          matter, talk to a SEBI-registered investment adviser.
        </p>

        <div className="rz-disclaimer">
          <strong>Disclaimer:</strong> This calculator is for information and planning only and does
          not constitute financial, investment or tax advice. Projections are simplified estimates
          based on the figures you enter and assume a constant rate of return, which no real
          investment provides. Actual outcomes will differ. Verify any figure that informs a real
          financial decision, and consult a qualified, SEBI-registered adviser before acting.
        </div>

        <p style={{ marginTop: 24 }}>
          Related tools: <a href="/8th-pay-commission">8th Pay Commission salary calculator</a> ·{" "}
          <a href="/fuel-cost-calculator">fuel cost calculator</a> ·{" "}
          <a href="/youtube">YouTube revenue calculator</a>
        </p>
      </section>
    </div>
  );
};
