// components/ui/input.jsx
import * as React from "react";
import { cn } from "@/lib/utils";

// The main Input component with support for all standard input features
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // Base styles for consistent input appearance
        "flex h-12 w-full rounded-lg border bg-white px-4 py-3 text-base shadow-sm",
        // Interactive states
        "placeholder:text-gray-500 text-gray-800 border-gray-300 focus:border-gray-500 hover:border-gray-400",
        "transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1",
        // Focus and placeholder styles
        "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
