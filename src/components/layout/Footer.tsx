import Link from "next/link";
import { contactInfo, navLinks, socialLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-ink border-t border-cream/10 text-cream">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              LUMIERE<span className="text-lime">.</span>VERITAS
            </Link>
            <p className="mt-4 text-cream/60 text-sm leading-relaxed max-w-xs">
              Creative media solutions. Strategy, creativity, media &amp;
              execution — one partner for brands that refuse to be ignored.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-lime mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/75 hover:text-lime transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-lime mb-5">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-cream/75">
              <li>
                <a
                  href={contactInfo.emailHref}
                  className="hover:text-lime transition-colors break-all"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.phoneHref}
                  className="hover:text-lime transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-lime mb-5">
              Social
            </p>
            <ul className="space-y-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-cream/75 hover:text-lime transition-colors"
                  >
                    {s.label}
                    <span className="text-cream/30 text-xs ml-2">
                      (PLACEHOLDER)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-cream/45">
          <p>© 2026 Lumiere Veritas Media Solutions. All rights reserved.</p>
          <p>Mumbai · India</p>
        </div>
      </div>
    </footer>
  );
}
