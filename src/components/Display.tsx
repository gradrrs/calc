export const Display = ({ equation, value }: { equation: string, value: string }) => (
  <div className="text-right mb-8 min-h-[100px] flex flex-col justify-end px-2">
    <div className="text-orange-500/80 text-sm font-medium mb-1 h-6 italic">{equation}</div>
    <div className="text-white text-6xl font-light tracking-tighter truncate leading-none">{value}</div>
  </div>
);