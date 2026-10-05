import css from "./loading.module.css";

export default function Loading() {
  return (
    <main className={css.container} role="status" aria-live="polite">
      <span className={css.spinner} aria-hidden="true" />
      <p>Loading NoteHub…</p>
    </main>
  );
}