import { useState, useEffect, useRef } from 'react';
import { Display } from './Display';
import { Keypad } from './Keypad';

interface CalculatorProps {
  isFocused: boolean;
  onResult: (exp: string, res: string) => void;
  onFocusChange?: (focused: boolean) => void;
}

export const Calculator = ({ isFocused, onResult, onFocusChange }: CalculatorProps) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const calculatorRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    if (!equation && display === '0') return;
    try {
      const fullExp = equation + display;
      const result = new Function(`return ${fullExp.replace(/×/g, '*').replace(/÷/g, '/')}`)();
      const formattedRes = String(Number(result.toFixed(8)));

      onResult(fullExp, formattedRes);
      setDisplay(formattedRes);
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleNumber = (num: string) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleToggleSign = () => {
    setDisplay(String(Number(display) * -1));
  };

  useEffect(() => {
    if (!isFocused) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9]/.test(e.key)) handleNumber(e.key);
      if (e.key === '+') handleOperator('+');
      if (e.key === '-') handleOperator('-');
      if (e.key === '*') handleOperator('×');
      if (e.key === '/') handleOperator('÷');
      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
      }
      if (e.key === 'Backspace') {
        setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
      }
      if (e.key === 'Escape') {
        handleClear();
      }
      if (e.key === '.' || e.key === ',') handleNumber('.');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, display, equation]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const focused = !!calculatorRef.current?.contains(e.target as Node);
      onFocusChange?.(focused);
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [onFocusChange]);

  return (
    <div
      ref={calculatorRef}
      className={`relative transition-all duration-500 ${isFocused ? 'scale-105' : 'scale-100'}`}
    >
      <div className={`absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-[3rem] blur opacity-25 transition duration-1000 ${isFocused ? 'opacity-40' : 'opacity-0'}`}></div>

      <div className="relative bg-slate-900/90 border border-white/10 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl w-[340px]">
        <div className="flex justify-between items-center mb-6 px-2">
          <div className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold ${isFocused ? 'text-orange-500' : 'text-slate-600'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isFocused ? 'bg-orange-500 animate-pulse' : 'bg-slate-700'}`}></div>
            {isFocused ? 'Keyboard Active' : 'Click to focus'}
          </div>
        </div>

        <Display equation={equation} value={display} />

        <Keypad
          onNumber={handleNumber}
          onOperator={handleOperator}
          onClear={handleClear}
          onToggleSign={handleToggleSign}
          onCalculate={calculate}
        />
      </div>
    </div>
  );
};