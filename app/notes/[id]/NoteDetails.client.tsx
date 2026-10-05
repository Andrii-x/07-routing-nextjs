"use client";

import { useQuery } from "@tanstack/react-query";
import NoteContent from "@/components/NoteContent/NoteContent";
import { fetchNoteById } from "@/lib/api";
import { noteKeys } from "@/lib/query-keys";
import css from "./NoteDetails.module.css";

export default function NoteDetails({ id }: { id: string }) {
  const { data, isPending, isError } = useQuery({
    queryKey: noteKeys.detail(id),
    queryFn: () => fetchNoteById(id),
  });

  if (isPending) return <p className={css.message}>Loading note…</p>;
  if (isError || !data) {
    return <p className={css.message} role="alert">This note could not be loaded.</p>;
  }

  return <NoteContent note={data} />;
}