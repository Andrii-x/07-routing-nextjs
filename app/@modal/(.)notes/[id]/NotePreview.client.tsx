"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NoteContent from "@/components/NoteContent/NoteContent";
import { fetchNoteById } from "@/lib/api";
import { noteKeys } from "@/lib/query-keys";
import css from "./NotePreview.module.css";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();
  const { data, isPending, isError } = useQuery({
    queryKey: noteKeys.detail(id),
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isPending ? (
        <p className={css.message}>Loading note…</p>
      ) : isError || !data ? (
        <p className={css.message} role="alert">This note could not be loaded.</p>
      ) : (
        <NoteContent note={data} />
      )}
    </Modal>
  );
}
