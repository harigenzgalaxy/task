// import { Chart } from "../../components/ui/Chart"

// const data = [
//   { name: "Jan", value: 42000 },
//   { name: "Feb", value: 35000 },
//   { name: "Mar", value: 45000 },
//   { name: "Apr", value: 52000 },
//   { name: "May", value: 48000 },
//   { name: "Jun", value: 60000 },
// ]

// export default function RevenueOverview() {
//   return (
//     <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//       <div className="mb-6">
//         <h3 className="text-xl font-semibold text-white mb-2">Revenue Overview</h3>
//         <p className="text-gray-400 text-sm">Monthly revenue and deals closed over time</p>
//       </div>

//       <Chart data={data} />
//     </div>
//   )
// }


import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 42000 },
  { name: 'Feb', revenue: 34000 },
  { name: 'Mar', revenue: 45000 },
  { name: 'Apr', revenue: 51000 },
  { name: 'May', revenue: 46000 },
  { name: 'Jun', revenue: 58000 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-xl bg-[#0f172a] p-6 text-white">
      <h3 className="text-lg font-semibold">Revenue Overview</h3>
      <p className="text-sm text-gray-400 mb-4">
        Monthly revenue and deals closed over time
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip formatter={(val) => `$${val}`} />
          <Bar dataKey="revenue" fill="#a78bfa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
