import { api } from "@/lib/api/client";
import type { FetchNotesParams, Note, NotesResponse } from "@/types/note";

export async function fetchNotes({ page, search = "", tag = "" }: FetchNotesParams) {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
      tag: tag && tag.toLowerCase() !== "all" ? tag : undefined,
    },
  });

  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}
