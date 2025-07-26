import React from "react";
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }

export const Progress = ({ value = 0, className = "", ...props }) => {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
