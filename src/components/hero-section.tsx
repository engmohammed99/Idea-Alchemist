"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Loader2 } from "lucide-react";
import { GlassInput } from "@/components/ui/glass-input";
import { ResultCard } from "@/components/ui/result-card";
import { cn } from "@/lib/utils";

const MOCK_RESULT = {
    summary: "A high-conversion landing page for the user's idea.",
    visualStyle: "Dark aesthetics with neon purple/teal accents. Sans-serif typography. Clean glassmorphism cards.",
    keySections: ["Hero with Magnetic CTA", "Social Proof Grid", "Feature Carousel", "Pricing Cards", "Contact Form"],
    techStack: "Next.js, Tailwind CSS, Framer Motion, TypeScript"
};

export function HeroSection() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState<typeof MOCK_RESULT | null>(null);

    const handleEnhance = async () => {
        if (!inputValue.trim()) return;
        setStatus("loading");
        setResult(null);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: inputValue }),
            });

            if (!response.ok) throw new Error("Failed to generate");

            const data = await response.json();
            setResult(data);
            setStatus("success");
        } catch (error) {
            console.error(error);
            setStatus("idle");
            // Optional: Add error toast here
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleEnhance();
        }
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden">
            <motion.div
                layout
                className="relative w-full max-w-2xl z-10 flex flex-col items-center"
            >
                {/* Header */}
                <motion.div layout className="text-center mb-10 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}

                        className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent pb-1"
                    >
                        Idea Alchemist
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-white/50 max-w-lg mx-auto"
                    >
                        Transform your rough website idea into a structured architectural blueprint in seconds.
                    </motion.p>
                </motion.div>

                {/* Input Area */}
                <motion.div layout className="w-full relative group">
                    <div className="relative flex items-center">
                        <GlassInput
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g., A minimalist portfolio for a landscape photographer..."
                            disabled={status === "loading"}
                            className="pr-16"
                        />
                        <button
                            onClick={handleEnhance}
                            disabled={status === "loading" || !inputValue.trim()}
                            className={cn(
                                "absolute right-2 p-2 rounded-xl transition-all duration-300",
                                status === "loading"
                                    ? "bg-transparent text-white/50 cursor-wait"
                                    : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 active:scale-95"
                            )}
                        >
                            <AnimatePresence mode="wait">
                                {status === "loading" ? (
                                    <motion.div
                                        key="loader"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                    >
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="wand"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                    >
                                        <Wand2 className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>

                    {/* Decorative Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-focus-within:opacity-20 transition duration-500 -z-10 blur-xl" />
                </motion.div>

                {/* Result Area */}
                <AnimatePresence mode="popLayout">
                    {status === "success" && result && (
                        <ResultCard key="result" data={result} />
                    )}
                </AnimatePresence>

            </motion.div>
        </section>
    );
}
