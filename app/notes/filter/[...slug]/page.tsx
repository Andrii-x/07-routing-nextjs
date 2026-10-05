import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchNotes } from "@/lib/api/notes";
import { getQueryClient } from "@/lib/get-query-client";
import { noteKeys } from "@/lib/query-keys";
import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

const allowedTags = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug[0] ?? "all";

  if (slug.length !== 1 || !allowedTags.includes(tag)) notFound();

  const queryClient = getQueryClient();
  const queryParams = { page: 1, search: "", tag };

  await queryClient.prefetchQuery({
    queryKey: noteKeys.list(queryParams),
    queryFn: () => fetchNotes(queryParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag as NoteTag | "all"} />
    </HydrationBoundary>
  );
}
