"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const INTRO_KEY = "lv-intro-seen";

export function Intro() {
  const [phase, setPhase] = useState<"black" | "emblem" | "full" | "done">(
    "black"
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_KEY) === "1") {
        setVisible(false);
        setPhase("done");
        return;
      }
    } catch {
      /* ignore */
    }

    const t1 = setTimeout(() => setPhase("emblem"), 400);
    const t2 = setTimeout(() => setPhase("full"), 1400);
    const t3 = setTimeout(() => {
      setVisible(false);
      setPhase("done");
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex flex-col items-center justify-center px-8">
            <AnimatePresence mode="wait">
              {phase === "emblem" && (
                <motion.div
                  key="emblem"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <Image
                    src="/brand/logo.png"
                    alt=""
                    width={480}
                    height={438}
                    className="h-36 sm:h-44 w-auto object-contain rounded-lg bg-white"
                    priority
                  />
                </motion.div>
              )}
              {(phase === "full" || phase === "black") && phase !== "black" && (
                <motion.div
                  key="full"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="/brand/logo-full.png"
                    alt="Lumiere Veritas Media Solutions"
                    width={640}
                    height={584}
                    className="h-48 sm:h-60 md:h-72 w-auto object-contain rounded-lg bg-white"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {phase === "black" && (
              <div className="h-36 sm:h-48" aria-hidden />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
