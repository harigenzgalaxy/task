// import { Card, CardContent, CardHeader, CardTitle } from "./Card";
// import { Badge } from "./Badge";
// import { Progress } from "./Progress";
// import { CalendarDays, MapPin, User } from "lucide-react";

// const statusColors = {
//   Assigned: "bg-yellow-500 text-white",
//   "In Progress": "bg-blue-500 text-white",
//   Editing: "bg-purple-500 text-white",
//   Delivered: "bg-green-600 text-white",
//   Completed: "bg-emerald-600 text-white",
// };

// export default function EventCard({
//   name,
//   date,
//   location,
//   genre,
//   status,
//   progress,
//   client,
// }) {
//   return (
//     <Card className="w-full shadow-md hover:shadow-lg transition duration-300 border-muted/40">
//       <CardHeader className="pb-0 flex flex-col gap-1">
//         <div className="flex justify-between items-start">
//           <div>
//             <CardTitle className="text-lg font-semibold text-foreground">
//               {name}
//             </CardTitle>
//             <div className="text-muted-foreground text-sm mt-0.5">{genre}</div>
//           </div>
//           <Badge className={`text-xs px-2 py-1 rounded-md ${statusColors[status]}`}>
//             {status}
//           </Badge>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-3 pt-3">
//         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//           <CalendarDays className="w-4 h-4" />
//           <span>{date}</span>
//         </div>

//         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//           <MapPin className="w-4 h-4" />
//           <span>{location}</span>
//         </div>

//         {client && (
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <User className="w-4 h-4" />
//             <span>{client.name}</span>
//           </div>
//         )}

//         <div>
//           <div className="flex justify-between text-xs text-muted-foreground mb-1">
//             <span>Progress</span>
//             <span>{progress}%</span>
//           </div>
//           <Progress value={progress} className="h-2 rounded bg-muted" />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Badge } from "./badge";
import { Progress } from "./Progress";
import { CalendarDays, MapPin, User } from "lucide-react";

const statusColors = {
  Assigned: "bg-yellow-500 text-white",
  "In Progress": "bg-blue-500 text-white",
  Editing: "bg-purple-500 text-white",
  Delivered: "bg-green-600 text-white",
  Completed: "bg-emerald-600 text-white",
};

export default function EventCard({
  name,
  date,
  location,
  genre,
  status,
  progress,
  client,
}) {
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition duration-300 border-muted/40 relative">
      <CardHeader className="pb-1">
        <div className="relative">
          <CardTitle className="text-lg font-semibold text-foreground">
            {name}
          </CardTitle>
          <div className="text-muted-foreground text-sm mt-0.5">{genre}</div>

          {/* Status Badge on top-right */}
          <div className="absolute top-0 right-0">
            <Badge className={`text-xs px-2 py-1 rounded-md ${statusColors[status]}`}>
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        {client && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{client.name}</span>
          </div>
        )}

        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
