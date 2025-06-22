'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NoteCard({ note }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch('/api/notes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: note.id }),
      });
      if (res.ok) {
        router.refresh(); // Refresh to update the note list
      } else {
        alert('Failed to delete note');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{note.content}</p>
        <div className="mt-4 space-x-2">
          <Button onClick={() => router.push(`/notes/${note.id}`)}>Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
}