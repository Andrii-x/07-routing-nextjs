"use client";

import { useRouter } from "next/navigation";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import css from "./Modal.module.css";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") router.back();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [router]);

  function closeOnBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) router.back();
  }

  return (
    <div className={css.backdrop} onMouseDown={closeOnBackdrop}>
      <section className={css.dialog} role="dialog" aria-modal="true" aria-label="Note details">
        <button
          className={css.close}
          type="button"
          onClick={() => router.back()}
          aria-label="Close note"
        >
          <span aria-hidden="true">×</span>
        </button>
        {children}
      </section>
    </div>
  );
}
