import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactsForm } from "@/components/leads/ContactsForm";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с командой «Огороды» — позвоним, ответим на вопросы и пригласим на просмотр участка.",
};

export default function ContactsPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <Caret />
            <span className="current">Контакты</span>
          </nav>
          <h1 className="h-page">
            Приезжайте познакомиться&nbsp;<em>лично</em>
          </h1>
          <p className="page-lede">
            Открыты с&nbsp;8:00 до&nbsp;21:00&nbsp;— ответим, покажем и&nbsp;расскажем
            про участки.
          </p>
        </div>
      </section>

      <section className="contacts-block">
        <div className="wrap">
          <div className="contacts-grid">
            <div className="contact-card">
              <span className="label">Телефон</span>
              <h3>+7 (861) 200-00-00</h3>
              <span className="meta">Ежедневно · 8:00–21:00</span>
            </div>
            <div className="contact-card">
              <span className="label">Email</span>
              <h3>hello@ogorody.ru</h3>
              <span className="meta">Ответ в&nbsp;течение часа</span>
            </div>
            <div className="contact-card">
              <span className="label">Адрес</span>
              <h3>ст.&nbsp;Елизаветинская</h3>
              <span className="meta">25&nbsp;минут от&nbsp;центра Краснодара</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="wrap">
          <div className="layout">
            <div className="map-card">
              <span className="info-tag">Как добраться</span>
              <h2>Карта проезда</h2>
              <p>
                Краснодарский край, ст.&nbsp;Елизаветинская. На&nbsp;месте есть
                бесплатная парковка для гостей.
              </p>
              <ul className="directions">
                <li>
                  <strong>На машине</strong>&nbsp;— 25&nbsp;мин от&nbsp;центра
                  по&nbsp;Елизаветинскому шоссе
                </li>
                <li>
                  <strong>На автобусе</strong>&nbsp;— №&nbsp;113 до&nbsp;ост.
                  «Елизаветинская», далее 5&nbsp;мин пешком
                </li>
                <li>
                  <strong>На такси</strong>&nbsp;— ~600&nbsp;₽ из&nbsp;центра города
                </li>
              </ul>
              <Image
                className="map-img"
                src="/assets/plots/start-1.jpg"
                alt="Карта"
                width={800}
                height={500}
              />
            </div>

            <ContactsForm />
          </div>
        </div>
      </section>

      <section className="socials-block">
        <div className="wrap">
          <h2>Мы&nbsp;на&nbsp;связи</h2>
          <div className="socials-grid">
            <a className="social-link" href="https://t.me/" target="_blank" rel="noopener noreferrer">
              <div className="dot">TG</div>
              <div className="text">
                <strong>Telegram</strong>
                <span>@ogorody_club</span>
              </div>
            </a>
            <a className="social-link" href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <div className="dot">WA</div>
              <div className="text">
                <strong>WhatsApp</strong>
                <span>+7 (861) 200-00-00</span>
              </div>
            </a>
            <a className="social-link" href="https://vk.com/ogorody" target="_blank" rel="noopener noreferrer">
              <div className="dot">VK</div>
              <div className="text">
                <strong>ВКонтакте</strong>
                <span>vk.com/ogorody</span>
              </div>
            </a>
            <a className="social-link" href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <div className="dot">YT</div>
              <div className="text">
                <strong>YouTube</strong>
                <span>Огороды клуб</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="faq-block">
        <div className="wrap">
          <h2>Частые вопросы перед визитом</h2>
          <div className="faq-list">
            <FaqItem
              question="Сколько времени займёт первый визит?"
              answer="В среднем 1.5–2 часа. Экскурсия по территории, демонстрация видеонаблюдения и консультация по выбору формата. Можно приезжать с детьми — есть место для игр."
              defaultOpen
            />
            <FaqItem
              question="Можно ли приехать с партнёром или семьёй?"
              answer="Конечно! Приезжайте с супругом, родителями, детьми. Это помогает всей семье понять, подходит ли формат, и обсудить решение вместе."
            />
            <FaqItem
              question="Что делать, если я ничего не знаю про огороды?"
              answer="Идеально! Для вас есть форматы с полным делегированием или полусамостоятельно, где агрономы подскажут каждый шаг. Люди учатся на практике с нашей командой — это весело и не страшно."
            />
            <FaqItem
              question="Можно ли приехать зимой?"
              answer="Да, но лучше приезжать в тёплое время года (апрель–октябрь), когда видны растения, теплица и текущая работа. Зимой будет менее наглядно, но всё покажем — просто оденьтесь потеплее."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({
  question,
  answer,
  defaultOpen,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  return (
    <details className={`faq-item${defaultOpen ? " open" : ""}`} open={defaultOpen}>
      <summary className="faq-header">
        <h3>{question}</h3>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="faq-body">
        <p>{answer}</p>
      </div>
    </details>
  );
}

function Caret() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M3 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
