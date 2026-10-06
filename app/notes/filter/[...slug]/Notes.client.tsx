"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { noteKeys } from "@/lib/query-keys";
import type { NoteTag } from "@/types/note";
import css from "./Notes.module.css";

export default function NotesClient({ tag }: { tag: NoteTag | "all" }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedSearch(search), 300);
    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const params = { page, search: debouncedSearch, tag };
  const { data, isPending, isError, error } = useQuery({
    queryKey: noteKeys.list(params),
    queryFn: () => fetchNotes(params),
    refetchOnMount: false,
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
        <SearchBox
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      </div>

      <div className={css.createRow}>
        <button
          className={css.createButton}
          type="button"
          aria-expanded={showForm}
          onClick={() => setShowForm((visible) => !visible)}
        >
          {showForm ? "Cancel" : "+ Add a note"}
        </button>
      </div>
      {showForm && (
        <Modal onClose={() => setShowForm(false)} label="Create a note">
          <h2 className={css.formTitle}>Create a note</h2>
          <NoteForm onClose={() => setShowForm(false)} />
        </Modal>
      )}

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
          <NoteList notes={data.notes} />
          <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      )}
    </main>
  );
}
