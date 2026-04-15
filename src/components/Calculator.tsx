import { useState } from 'react';
import { Display } from './Display';

export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => setDisplay(prev => prev === '0' ? num : prev + num);
  const handleOperator = (op: string) => { setEquation(display + ' ' + op + ' '); setDisplay('0'); };
  
  return (
    <div className="bg-slate-900 p-8 rounded-[2.5rem] w-[340px]">
      <Display equation={equation} value={display} />
      <div className="grid grid-cols-4 gap-3">
        <button onClick={() => setDisplay('0')} className="col-span-3 bg-slate-700 text-white h-16 rounded-2xl">C</button>
        <button onClick={() => handleOperator('/')} className="bg-orange-500 text-white h-16 rounded-2xl">÷</button>
      </div>
    </div>
  );
};