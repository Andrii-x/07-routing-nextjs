import Link from "next/link";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <Link href="/notes/filter/all" className={css.brand}>notehub</Link>
      <span>Notes for a clearer day.</span>
      <span className={css.year}>© {new Date().getFullYear()} NoteHub</span>
    </footer>
  );
}
