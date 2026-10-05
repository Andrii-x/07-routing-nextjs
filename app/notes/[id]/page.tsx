import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { getQueryClient } from "@/lib/get-query-client";
import { noteKeys } from "@/lib/query-keys";
import css from "./page.module.css";
import NoteDetails from "./NoteDetails.client";

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

  if (!queryClient.getQueryData(noteKeys.detail(id))) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={css.container}>
        <NoteDetails id={id} />
      </main>
    </HydrationBoundary>
  );
}
