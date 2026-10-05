"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { fetchNotes } from "@/lib/api/notes";
import { noteKeys } from "@/lib/query-keys";
import type { NoteTag } from "@/types/note";
import css from "./Notes.module.css";

export default function NotesClient({ tag }: { tag: NoteTag | "all" }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const params = { page, search, tag };
  const { data, isPending, isError, error } = useQuery({
    queryKey: noteKeys.list(params),
    queryFn: () => fetchNotes(params),
    placeholderData: (previousData) => previousData,
  });

  const title = tag === "all" ? "All notes" : `${tag} notes`;

  return (
    <main>
      <div className={css.eyebrow}>YOUR NOTEBOOK</div>
      <div className={css.titleRow}>
        <div>
          <h1 className={css.title}>{title}</h1>
          <p className={css.subtitle}>A little space for everything on your mind.</p>
        </div>
        <label className={css.searchLabel}>
          <span className={css.searchIcon} aria-hidden="true">⌕</span>
          <input
            className={css.search}
            type="search"
            placeholder="Search notes"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            aria-label="Search notes"
          />
        </label>
      </div>

      {isPending ? (
        <p className={css.message}>Loading notes…</p>
      ) : isError ? (
        <p className={css.message} role="alert">
          {error.message || "Could not load notes. Check the API token and try again."}
        </p>
      ) : data.notes.length === 0 ? (
        <div className={css.emptyState}>
          <span className={css.emptyMark}>N</span>
          <h2>No notes here yet</h2>
          <p>Try another tag or search for something different.</p>
        </div>
      ) : (
        <>
          <div className={css.resultsLine}>
            <span>{data.notes.length} notes on this page</span>
            <span className={css.resultsTag}>{tag === "all" ? "EVERYTHING" : tag.toUpperCase()}</span>
          </div>
          <ul className={css.noteGrid}>
            {data.notes.map((note) => (
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
          {data.totalPages > 1 && (
            <div className={css.pagination}>
              <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
              <span>{page} / {data.totalPages}</span>
              <button disabled={page >= data.totalPages} onClick={() => setPage(page + 1)}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
