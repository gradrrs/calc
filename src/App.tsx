import { useState } from 'react';
import { Calculator } from './components/Calculator';

export default function App() {
  const [isFocused, setIsFocused] = useState(true);

  const handleResult = (exp: string, res: string) => {
    return console.log(`Expression: ${exp}, Result: ${res}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black flex items-center justify-center p-6 antialiased">
      <div className="flex gap-8 flex-col lg:flex-row items-center max-w-4xl w-full justify-center">
        <Calculator 
          isFocused={isFocused} 
          onResult={handleResult}
          onFocusChange={setIsFocused}
        />
      </div>
    </div>
  );
}