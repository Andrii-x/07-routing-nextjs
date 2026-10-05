import type { FetchNotesParams } from "@/types/note";

export const noteKeys = {
  all: ["notes"] as const,
  list: (params: FetchNotesParams) => ["notes", params] as const,
  detail: (id: string) => ["note", id] as const,
};
