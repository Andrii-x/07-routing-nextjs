"use client";

import { useRouter } from "next/navigation";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  label?: string;
}

export default function Modal({ children, onClose, label = "Note details" }: ModalProps) {
  const router = useRouter();

  function close() {
    if (onClose) {
      onClose();
      return;
    }

    router.back();
  }

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (onClose) onClose();
        else router.back();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose, router]);

  function closeOnBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) close();
  }

  return (
    <div className={css.backdrop} onMouseDown={closeOnBackdrop}>
      <section className={css.dialog} role="dialog" aria-modal="true" aria-label={label}>
        <button
          className={css.close}
          type="button"
          onClick={close}
          aria-label="Close dialog"
        >
          <span aria-hidden="true">×</span>
        </button>
        {children}
      </section>
    </div>
  );
}
