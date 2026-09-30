"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { navLinks, contactInfo } from "@/data/navigation";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkHref = (hash: string, href: string) => (isHome ? hash : href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-ink/95 backdrop-blur-md border-b border-cream/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10 lg:px-14 py-4 md:py-5">
          <Link
            href="/"
            className="font-display text-lg md:text-xl font-semibold tracking-tight text-cream hover:text-lime transition-colors"
          >
            LUMIERE<span className="text-lime">.</span>VERITAS
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={linkHref(link.hash, link.href)}
                className="text-sm tracking-wide text-cream/80 hover:text-lime transition-colors link-underline"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isHome ? "#contact" : "/contact"}
              className="ml-2 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-ink hover:bg-cream transition-colors"
            >
              Start a Project
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden relative z-50 flex h-11 w-11 items-center justify-center"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-6 flex-col gap-1.5">
              <span
                className={`block h-[1.5px] w-full bg-cream transition-all duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-cream transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-cream transition-all duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-ink flex flex-col justify-between px-6 py-28 lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.45 }}
                >
                  <Link
                    href={linkHref(link.hash, link.href)}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl sm:text-5xl font-medium text-cream hover:text-lime transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 text-cream/70 text-sm"
            >
              <a
                href={contactInfo.emailHref}
                className="block hover:text-lime transition-colors"
              >
                {contactInfo.email}
              </a>
              <a
                href={contactInfo.phoneHref}
                className="block hover:text-lime transition-colors"
              >
                {contactInfo.phone}
              </a>
              <Link
                href={isHome ? "#contact" : "/contact"}
                onClick={() => setOpen(false)}
                className="inline-flex mt-4 rounded-full bg-lime px-6 py-3 text-ink font-medium"
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
