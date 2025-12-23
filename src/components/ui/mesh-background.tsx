"use client";

import { motion } from "framer-motion";

export function MeshBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute inset-0 bg-slate-950" />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-indigo-500/30 rounded-full blur-[128px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-[40%] right-[-20%] w-[60vw] h-[60vw] bg-purple-600/20 rounded-full blur-[128px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
    );
}
