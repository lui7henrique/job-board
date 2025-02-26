"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	Bold,
	Code,
	Heading1,
	Heading2,
	Italic,
	List,
	ListOrdered,
	Quote,
	Redo,
	Undo,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

interface NotesFormProps {
	onSave?: (note: { title: string; content: string }) => void;
	initialData?: {
		title: string;
		content: string;
	};
}

export function NotesForm({ onSave, initialData }: NotesFormProps) {
	const [title, setTitle] = useState(initialData?.title || "");
	const [content, setContent] = useState(initialData?.content || "");

	const editor = useEditor({
		extensions: [StarterKit],
		content: initialData?.content || "",
		onUpdate: ({ editor }) => {
			setContent(editor.getHTML());
		},
	});

	useEffect(() => {
		if (editor && initialData?.content) {
			editor.commands.setContent(initialData.content);
		}
	}, [editor, initialData?.content]);

	const handleSave = () => {
		if (onSave) {
			onSave({ title, content });
		}
	};

	const ToolbarButton = ({
		onClick,
		active = false,
		disabled = false,
		children,
	}: {
		onClick: () => void;
		active?: boolean;
		disabled?: boolean;
		children: React.ReactNode;
	}) => (
		<Button
			type="button"
			variant={active ? "default" : "outline"}
			size="icon"
			onClick={onClick}
			disabled={disabled}
			className={cn(
				"h-7 w-7 p-0 !text-muted-foreground",
				active && "!text-white",
			)}
		>
			{children}
		</Button>
	);

	return (
		<Card className="w-full border-none gap-4 pt-0">
			<CardHeader className="py-2 border-b border-dashed">
				<Input
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="!text-lg font-medium border-none shadow-none focus-visible:ring-0 px-0 h-auto"
				/>
			</CardHeader>

			<CardContent>
				<div className="flex flex-wrap gap-1 mb-2">
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleBold().run()}
						active={editor?.isActive("bold") || false}
						disabled={!editor}
					>
						<Bold className="size-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleItalic().run()}
						active={editor?.isActive("italic") || false}
						disabled={!editor}
					>
						<Italic className="size-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() =>
							editor?.chain().focus().toggleHeading({ level: 1 }).run()
						}
						active={editor?.isActive("heading", { level: 1 }) || false}
						disabled={!editor}
					>
						<Heading1 className="size-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() =>
							editor?.chain().focus().toggleHeading({ level: 2 }).run()
						}
						active={editor?.isActive("heading", { level: 2 }) || false}
						disabled={!editor}
					>
						<Heading2 className="size-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleBulletList().run()}
						active={editor?.isActive("bulletList") || false}
						disabled={!editor}
					>
						<List className="size-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleOrderedList().run()}
						active={editor?.isActive("orderedList") || false}
						disabled={!editor}
					>
						<ListOrdered className="size-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleBlockquote().run()}
						active={editor?.isActive("blockquote") || false}
						disabled={!editor}
					>
						<Quote className="size-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
						active={editor?.isActive("codeBlock") || false}
						disabled={!editor}
					>
						<Code className="size-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().undo().run()}
						disabled={!editor?.can().undo()}
					>
						<Undo className="size-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor?.chain().focus().redo().run()}
						disabled={!editor?.can().redo()}
					>
						<Redo className="size-4" />
					</ToolbarButton>
				</div>

				<EditorContent
					editor={editor}
					className="min-h-[300px] prose max-w-none focus:outline-none text-sm"
				/>
			</CardContent>
			<CardFooter className="flex justify-end">
				<Button onClick={handleSave}>Save</Button>
			</CardFooter>
		</Card>
	);
}
