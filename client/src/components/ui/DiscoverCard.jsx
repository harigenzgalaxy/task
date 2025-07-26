import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { Badge } from "./badge";
import { CalendarDays, MapPin, Tag } from "lucide-react";

export default function DiscoverCard({
  studioName,
  location,
  lookingFor,
  date,
  description,
  tags = [],
}) {
  return (
    <Card className="w-full border-border bg-card hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              {studioName}
            </CardTitle>
            <div className="text-muted-foreground text-sm mt-1">
              Looking for: <span className="font-medium text-foreground">{lookingFor}</span>
            </div>
          </div>
          <Badge className="text-xs bg-blue-500 text-white">
            {new Date(date).toDateString()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        <p className="text-sm text-foreground leading-relaxed">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs bg-muted text-muted-foreground border-border px-2"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
