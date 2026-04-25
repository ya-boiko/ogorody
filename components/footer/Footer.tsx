import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="grid">
          <div>
            <Link className="logo" href="/" aria-label="Огороды — на главную">
              <Image
                className="logo-img logo-img-invert"
                src={asset("/assets/logo.png")}
                alt="Огороды"
                width={174}
                height={45}
              />
            </Link>
          </div>
          <div>
            <h4>Сервис</h4>
            <ul>
              <li>
                <Link href="/care">Помощь в уходе</Link>
              </li>
              <li>
                <Link href="/catalog">Участки</Link>
              </li>
              <li>
                <Link href="/about">Как устроен сезон</Link>
              </li>
              <li>
                <Link href="/about#faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>О нас</h4>
            <ul>
              <li>
                <Link href="/about">О проекте</Link>
              </li>
              <li>
                <Link href="/blog">Блог</Link>
              </li>
              <li>
                <Link href="/news">Новости</Link>
              </li>
              <li>
                <Link href="/contacts">Контакты</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Связаться</h4>
            <ul>
              <li>
                <a href="tel:+78610000000">+7 861 000‑00‑00</a>
              </li>
              <li>
                <a href="mailto:hello@ogorody.ru">hello@ogorody.ru</a>
              </li>
              <li>
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <span>© {new Date().getFullYear()} Огороды · Краснодарский край</span>
          <span>Политика конфиденциальности · Пользовательское соглашение</span>
        </div>
      </div>
    </footer>
  );
}
