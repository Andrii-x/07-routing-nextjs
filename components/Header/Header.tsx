import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.brand} href="/" aria-label="NoteHub home">
        <span className={css.brandMark}>N</span>
        <span>notehub</span>
      </Link>
      <nav className={css.navigation} aria-label="Main navigation">
        <Link className={css.navLink} href="/notes/filter/all">
          Notes
        </Link>
        <span className={css.status}>YOUR SPACE, IN ORDER</span>
      </nav>
    </header>
  );
}
