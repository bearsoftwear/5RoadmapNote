import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";

export default function NoteForm({onNoteAdded}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        await fetch('/api/notes', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, content}),
        })

        setTitle('');
        setContent('');
        onNoteAdded();
    }
    return (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
            />
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note content (optional)"
            />
            <Button type="submit">Add Note</Button>
        </form>
    )
}