import Image from "next/image";
import Link from "next/link";
import { activeSocialLinks, contactInfo, navLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-bg border-t border-text/10 text-text">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/brand/logo.png"
                alt="Lumiere Veritas Media Solutions"
                width={220}
                height={147}
                className="h-28 md:h-32 w-auto object-contain rounded-lg bg-white"
              />
            </Link>
            <p className="mt-6 text-xs tracking-[0.22em] uppercase text-gold leading-relaxed">
              Strategy. Creativity.
              <br />
              Media. Execution.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text/75 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-5">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-text/75">
              <li>
                <a
                  href={contactInfo.emailHref}
                  className="hover:text-gold transition-colors break-all"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.phoneHref}
                  className="hover:text-gold transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-5">
              Social
            </p>
            <ul className="space-y-3">
              {activeSocialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text/75 hover:text-gold transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-text/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted">
          <p>© 2026 Lumiere Veritas Media Solutions. All rights reserved.</p>
          <p>STRATEGY · CREATIVITY · MEDIA · EXECUTION</p>
        </div>
      </div>
    </footer>
  );
}
