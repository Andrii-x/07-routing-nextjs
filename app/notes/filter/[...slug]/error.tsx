"use client";

import { useEffect } from "react";
import css from "./error.module.css";

export default function NotesError({
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
      <h1>Notes are unavailable</h1>
      <p>Check your connection and API token, then try again.</p>
      <button type="button" onClick={reset}>Try again</button>
    </main>
  );
}
