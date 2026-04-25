import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head">
      <div className="wrap">
        <p className="kicker">404</p>
        <h1 className="h-page">
          Кажется, <em>сюда не доехать</em>
        </h1>
        <p className="page-lede">
          Страница, которую вы искали, переехала или никогда не существовала. Можно
          вернуться к каталогу или на главную.
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
          <Link className="btn btn-primary" href="/catalog">
            Смотреть участки
          </Link>
          <Link className="btn btn-dark" href="/">
            На главную
          </Link>
        </div>
      </div>
    </section>
  );
}
