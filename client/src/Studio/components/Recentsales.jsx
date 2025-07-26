const sales = [
    {
      name: 'Jane Doe',
      company: 'Acme Inc.',
      value: '$15,000',
    },
    {
      name: 'Mike Roberts',
      company: 'StartupXYZ',
      value: '$12,500',
    },
    {
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      value: '$25,000',
    },
    {
      name: 'Alex Lee',
      company: 'Global Solutions',
      value: '$8,500',
    },
    {
      name: 'Emily Martinez',
      company: 'Retail Chain Co.',
      value: '$25,000',
    },
  ];
  
  export default function RecentSales() {
    return (
      <div className="rounded-xl bg-[#0f172a] p-6 text-white">
        <h3 className="text-lg font-semibold">Recent Sales</h3>
        <p className="text-sm text-gray-400 mb-4">
          Latest deals closed by your team
        </p>
        <div className="space-y-4">
          {sales.map((sale, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-700" />
                <div>
                  <p className="text-sm font-medium">{sale.name}</p>
                  <p className="text-xs text-gray-400">{sale.company}</p>
                </div>
              </div>
              <p className="text-sm font-semibold">{sale.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  