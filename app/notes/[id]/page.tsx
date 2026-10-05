import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import NoteContent from "@/components/NoteContent/NoteContent";
import { fetchNoteById } from "@/lib/api/notes";
import { getQueryClient } from "@/lib/get-query-client";
import { noteKeys } from "@/lib/query-keys";
import css from "./page.module.css";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: noteKeys.detail(id),
    queryFn: () => fetchNoteById(id),
  });

  const note = queryClient.getQueryData<Awaited<ReturnType<typeof fetchNoteById>>>(
    noteKeys.detail(id),
  );

  if (!note) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={css.container}>
        <NoteContent note={note} />
      </main>
    </HydrationBoundary>
  );
}
