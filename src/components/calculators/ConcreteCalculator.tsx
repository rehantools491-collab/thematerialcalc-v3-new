'use client';

import { useState, useCallback } from 'react';
import { calcConcrete, formatNumber, type ConcreteResult } from '@/lib/calculations';
import { WASTE_OPTIONS } from '@/lib/constants';

export default function ConcreteCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('4');
  const [waste, setWaste] = useState(0.10);
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [result, setResult] = useState<ConcreteResult | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = useCallback(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);
    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return;
    setResult(calcConcrete(l, w, d, waste));
  }, [length, width, depth, waste]);

  const reset = () => {
    setLength(''); setWidth(''); setDepth('4');
    setWaste(0.10); setResult(null); setCopied(false);
  };

  const copyResults = () => {
    if (!result) return;
    const text = `Concrete Calculator Results\nVolume: ${formatNumber(result.cubicYards)} cubic yards (${formatNumber(result.cubicFeet)} cu ft / ${formatNumber(result.cubicMeters)} m³)\nWith ${waste * 100}% waste: ${formatNumber(result.withWaste.cubicYards)} cubic yards\nCalculated at materialcalc.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-card">
      {/* Unit Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex bg-gray-50 rounded-lg p-0.5 border border-gray-100">
          {(['imperial', 'metric'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                unit === u ? 'bg-navy text-white font-semibold' : 'text-gray-400'
              }`}
            >
              {u === 'imperial' ? 'Imperial' : 'Metric'}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="c-length" className="input-label">Length</label>
          <div className="relative">
            <input
              id="c-length"
              type="number"
              min="0.1"
              step="any"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && calculate()}
              placeholder="Enter length"
              className="input-field pr-12"
              aria-label={`Length in ${unit === 'imperial' ? 'feet' : 'meters'}`}
            />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">
              {unit === 'imperial' ? 'ft' : 'm'}
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="c-width" className="input-label">Width</label>
          <div className="relative">
            <input
              id="c-width"
              type="number"
              min="0.1"
              step="any"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && calculate()}
              placeholder="Enter width"
              className="input-field pr-12"
              aria-label={`Width in ${unit === 'imperial' ? 'feet' : 'meters'}`}
            />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">
              {unit === 'imperial' ? 'ft' : 'm'}
            </span>
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="c-depth" className="input-label">Depth / Thickness</label>
          <div className="relative">
            <input
              id="c-depth"
              type="number"
              min="0.5"
              step="any"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && calculate()}
              placeholder="Enter depth"
              className="input-field pr-12"
              aria-label={`Depth in ${unit === 'imperial' ? 'inches' : 'centimeters'}`}
            />
            <span className="absolute right-0 top-0 h-12 px-3 flex items-center text-[13px] text-gray-400 bg-gray-50 border-l border-gray-100 rounded-r-lg font-medium">
              {unit === 'imperial' ? 'in' : 'cm'}
            </span>
          </div>
        </div>
      </div>

      {/* Waste Factor */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <span className="text-sm font-medium text-navy">Waste factor:</span>
        {WASTE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setWaste(opt.value)}
            className={`pill ${waste === opt.value ? 'pill-active' : ''}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Calculate Button */}
      <button onClick={calculate} className="btn-primary">
        Calculate Concrete
      </button>

      {/* Results */}
      {result && (
        <div className="result-area" aria-live="polite">
          <div className="text-xs font-semibold text-navy uppercase tracking-wider mb-4">Results</div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="border-l-[3px] border-orange pl-3">
              <div className="text-2xl md:text-[28px] font-bold text-navy tabular-nums">{formatNumber(result.cubicYards)}</div>
              <div className="text-xs font-medium text-gray-400">Cubic yards</div>
            </div>
            <div>
              <div className="text-lg md:text-xl font-semibold text-gray-600 tabular-nums">{formatNumber(result.cubicFeet)}</div>
              <div className="text-xs text-gray-400">Cubic feet</div>
            </div>
            <div>
              <div className="text-lg md:text-xl font-semibold text-gray-600 tabular-nums">{formatNumber(result.cubicMeters)}</div>
              <div className="text-xs text-gray-400">Cubic meters</div>
            </div>
          </div>
          {waste > 0 && (
            <div className="pt-3 border-t border-dashed border-gray-300 text-sm text-gray-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-warning shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              With {waste * 100}% waste: <strong className="text-navy">{formatNumber(result.withWaste.cubicYards)} cubic yards</strong>
            </div>
          )}
          <div className="flex gap-2 mt-4 justify-end">
            <button onClick={copyResults} className="btn-secondary">
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            <button onClick={reset} className="btn-secondary">Reset</button>
          </div>
        </div>
      )}

      {/* Trust Bar */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 justify-center">
        {['Free forever', 'No signup', 'Industry accurate', 'Mobile friendly'].map((t) => (
          <span key={t} className="text-xs text-gray-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
