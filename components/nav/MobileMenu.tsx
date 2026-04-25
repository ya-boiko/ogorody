"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/care", label: "Помощь в уходе" },
  { href: "/catalog", label: "Участки" },
  { href: "/about", label: "О проекте" },
  { href: "/blog", label: "Блог" },
  { href: "/news", label: "Новости" },
  { href: "/contacts", label: "Контакты" },
] as const;

const ARROW = (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M1 7h12m0 0L8 2m5 5l-5 5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Body class + escape + outside click
  useEffect(() => {
    if (!open) {
      document.body.classList.remove("menu-open");
      return;
    }
    document.body.classList.add("menu-open");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (burgerRef.current?.contains(target)) return;
      close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
      document.body.classList.remove("menu-open");
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        className="nav-burger"
        aria-label="Меню"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <aside
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu${open ? " open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mm-head">
          <Link className="logo" href="/" aria-label="Огороды — на главную">
            <Image
              className="logo-img"
              src="/assets/logo.png"
              alt="Огороды"
              width={140}
              height={36}
            />
          </Link>
          <button
            type="button"
            className="mm-close"
            aria-label="Закрыть меню"
            onClick={close}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="mm-body">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} className="mm-link" href={link.href} onClick={close}>
              {link.label}
              {ARROW}
            </Link>
          ))}
        </div>
        <div className="mm-foot">
          <span className="mm-phone">+7 861 000-00-00</span>
          <Link className="btn btn-dark" href="/contacts" onClick={close}>
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
        </div>
      </aside>
    </>
  );
}
