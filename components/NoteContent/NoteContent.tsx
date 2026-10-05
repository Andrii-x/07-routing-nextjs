import type { Note } from "@/types/note";
import css from "./NoteContent.module.css";

export default function NoteContent({ note }: { note: Note }) {
  return (
    <article className={css.article}>
      <span className={css.tag}>{note.tag}</span>
      <h1 className={css.title}>{note.title}</h1>
      <time className={css.date} dateTime={note.createdAt}>
        Created {new Date(note.createdAt).toLocaleDateString("en", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <div className={css.content}>{note.content}</div>
    </article>
  );
}
