import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";

export default function NoteCard({note, onNoteDeleted}) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleUpdate = async () => {
        if (!title.trim()) return;
        await fetch(`api/notes/${note.id}`, {
            method: "PUT",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({title, content}),
        })
        setIsEditing(false);
        onNoteDeleted();
    }

    const handleDelete = async () => {
        await fetch(`api/notes/${note.id}`, {
            method: "DELETE",
        })
        onNoteDeleted();
    }
    return (
        <Card>
            <CardContent className="pt-6">
                {isEditing ? (
                    <div className="space-y-2">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note title"
                        />
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Note content"
                        />
                    </div>
                ) : (
                    <div>
                        <h2 className="text-lg font-semibold">{note.title}</h2>
                        {note.content && <p className="text-gray-600">{note.content}</p>}
                        <p className="text-sm text-gray-500">
                            Created: {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="space-x-2">
                {isEditing ? (
                    <>
                        <Button onClick={handleUpdate}>Save</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => setIsEditing(true)}>Edit</Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}