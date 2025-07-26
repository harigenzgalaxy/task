// components/StatCard.jsx
export const StatCard = ({ title, value, icon: Icon, note, className }) => {
  return (
    <div className={`rounded-xl p-6 transition-all hover:shadow-lg ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-white/80">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {note && <p className="text-xs mt-1">{note}</p>}
        </div>
        <div className="p-3 bg-white/10 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};
