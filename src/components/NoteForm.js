// src/components/NoteForm.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function NoteForm({ note = null }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = note ? 'PUT' : 'POST';
    const url = note ? `/api/notes/${note.id}` : '/api/notes';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        router.push('/');
        router.refresh(); // Refresh to update the note list
      } else {
        alert('Failed to save note');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        required
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note content"
        required
      />
      <Button type="submit">{note ? 'Update Note' : 'Add Note'}</Button>
    </form>
  );
}