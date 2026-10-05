import Link from "next/link";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

export default function NoteList({ notes }: { notes: Note[] }) {
  return (
    <ul className={css.noteGrid}>
      {notes.map((note) => (
        <li key={note.id} className={css.noteItem}>
          <article className={css.noteCard}>
            <div className={css.cardTop}>
              <span className={css.tag}>{note.tag}</span>
              <time dateTime={note.createdAt}>
                {new Date(note.createdAt).toLocaleDateString("en", {
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
            <h2 className={css.noteTitle}>
              <Link href={`/notes/${note.id}`} className={css.noteLink}>
                {note.title}
              </Link>
            </h2>
            <p className={css.noteContent}>{note.content}</p>
            <Link href={`/notes/${note.id}`} className={css.openLink}>
              Open note <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
