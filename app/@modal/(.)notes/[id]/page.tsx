import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchNoteById } from "@/lib/api/notes";
import { getQueryClient } from "@/lib/get-query-client";
import { noteKeys } from "@/lib/query-keys";
import NotePreviewClient from "./NotePreview.client";

export default async function NotePreview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: noteKeys.detail(id),
      queryFn: () => fetchNoteById(id),
    });
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
