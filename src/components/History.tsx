type HistoryItem = { exp: string; res: string };

interface HistoryProps {
  items: HistoryItem[];
  onSelect: (value: string) => void;
}

export const History = ({ items, onSelect }: HistoryProps) => (
  <div className="w-[300px] flex flex-col animate-in fade-in slide-in-from-right-4 duration-700">
    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2rem] p-6 h-[480px] flex flex-col shadow-2xl">
      <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
        <span className="w-8 h-[1px] bg-white/10"></span> Recent Calculations
      </h3>
      <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        {items.length === 0 ? (
          <div className="text-slate-700 text-sm italic mt-4 text-center">No history yet</div>
        ) : (
          items.map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer hover:translate-x-1 transition-all border-l-2 border-transparent hover:border-orange-500/50 pl-4"
              onClick={() => onSelect(item.res)}
            >
              <div className="text-slate-500 text-[10px] font-mono mb-1 group-hover:text-orange-400 transition-colors">
                {item.exp} =
              </div>
              <div className="text-white/80 text-xl font-light tracking-tight">{item.res}</div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);