import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <nav aria-label="Filter notes by tag">
      <p className={css.heading}>LIBRARY</p>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            <span className={css.dot} />
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li className={css.menuItem} key={tag}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              <span className={css.dot} />
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      <div className={css.sidebarFoot}>Keep the important things close.</div>
    </nav>
  );
}
