import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface GlassInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    "w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5 text-lg text-white placeholder:text-white/30 shadow-xl shadow-black/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-white/10",
                    className
                )}
                {...props}
            />
        );
    }
);
GlassInput.displayName = "GlassInput";
