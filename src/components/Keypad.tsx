interface BtnProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "operator" | "action";
  className?: string;
}

const Btn = ({ children, onClick, variant = "default", className = "" }: BtnProps) => {
  const variants = {
    default: "bg-white/5 hover:bg-white/10 text-white border-white/5",
    operator: "bg-orange-500/80 hover:bg-orange-500 text-white border-orange-400/20 shadow-lg shadow-orange-500/20",
    action: "bg-slate-500/20 hover:bg-slate-500/40 text-slate-300 border-white/5",
  };
  return (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-medium rounded-2xl border backdrop-blur-md transition-all active:scale-90 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

interface KeypadProps {
  onNumber: (num: string) => void;
  onOperator: (op: string) => void;
  onClear: () => void;
  onToggleSign: () => void;
  onCalculate: () => void;
}

export const Keypad = ({ onNumber, onOperator, onClear, onToggleSign, onCalculate }: KeypadProps) => (
  <div className="grid grid-cols-4 gap-3">
    <Btn variant="action" onClick={onClear} className="col-span-2 text-xs uppercase tracking-widest">
      Clear
    </Btn>
    <Btn variant="action" onClick={onToggleSign}>+/-</Btn>
    <Btn variant="operator" onClick={() => onOperator('÷')}>÷</Btn>

    {[7, 8, 9].map(n => (
      <Btn key={n} onClick={() => onNumber(String(n))}>{n}</Btn>
    ))}
    <Btn variant="operator" onClick={() => onOperator('×')}>×</Btn>

    {[4, 5, 6].map(n => (
      <Btn key={n} onClick={() => onNumber(String(n))}>{n}</Btn>
    ))}
    <Btn variant="operator" onClick={() => onOperator('-')}>-</Btn>

    {[1, 2, 3].map(n => (
      <Btn key={n} onClick={() => onNumber(String(n))}>{n}</Btn>
    ))}
    <Btn variant="operator" onClick={() => onOperator('+')}>+</Btn>

    <Btn onClick={() => onNumber('0')} className="col-span-2 text-left px-8">0</Btn>
    <Btn onClick={() => onNumber('.')}>.</Btn>
    <Btn variant="operator" onClick={onCalculate} className="bg-gradient-to-br from-orange-400 to-orange-600 border-none">
      =
    </Btn>
  </div>
);