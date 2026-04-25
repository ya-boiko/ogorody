import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/care", label: "Помощь в уходе" },
  { href: "/catalog", label: "Участки" },
  { href: "/about", label: "О проекте" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
] as const;

export function Nav() {
  return (
    <>
      <nav className="nav">
        <div className="inner">
          <Link className="logo" href="/" aria-label="Огороды — на главную">
            <Image
              className="logo-img"
              src={asset("/assets/logo.png")}
              alt="Огороды"
              width={174}
              height={45}
              priority
            />
          </Link>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="nav-cta">
            <span className="phone">+7 861 000‑00‑00</span>
            <Link className="btn btn-dark" href="/contacts">
              Записаться на просмотр
              <svg className="arrow" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M1 7h12m0 0L8 2m5 5l-5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </nav>
    </>
  );
}
