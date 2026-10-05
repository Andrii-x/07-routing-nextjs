"use client";

import { useEffect } from "react";
import css from "./error.module.css";

export default function NoteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={css.container}>
      <h1>Could not load this note</h1>
      <p>Check your connection and try again.</p>
      <button type="button" onClick={reset}>Try again</button>
    </main>
  );
}