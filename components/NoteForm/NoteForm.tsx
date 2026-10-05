"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { createNote } from "@/lib/api/notes";
import { noteKeys } from "@/lib/query-keys";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Todo");
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      setTitle("");
      setContent("");
      await queryClient.invalidateQueries({ queryKey: noteKeys.all });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate({ title: title.trim(), content: content.trim(), tag });
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.field}>
        <span>Title</span>
        <input required maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label className={css.field}>
        <span>Note</span>
        <textarea required rows={3} value={content} onChange={(event) => setContent(event.target.value)} />
      </label>
      <div className={css.formBottom}>
        <label className={css.tagField}>
          <span>Tag</span>
          <select value={tag} onChange={(event) => setTag(event.target.value as NoteTag)}>
            {tags.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <button className={css.submit} disabled={mutation.isPending} type="submit">
          {mutation.isPending ? "Saving…" : "Add note"}
        </button>
      </div>
      {mutation.isError && <p className={css.error} role="alert">{mutation.error.message}</p>}
    </form>
  );
}
