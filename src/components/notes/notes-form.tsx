"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Define ToolbarButton outside of the component
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
	const [selectionCoords, setSelectionCoords] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [isTextSelected, setIsTextSelected] = useState(false);
	const selectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const editor = useEditor({
		extensions: [StarterKit],
		content: initialData?.content || "",
		onUpdate: ({ editor }) => {
			setContent(editor.getHTML());
		},
		onSelectionUpdate: ({ editor }) => {
			// Check if there's a text selection
			const { from, to } = editor.state.selection;
			const hasSelection = from !== to;

			// Clear any existing timeout
			if (selectionTimeoutRef.current) {
				clearTimeout(selectionTimeoutRef.current);
				selectionTimeoutRef.current = null;
			}

			if (!hasSelection) {
				setIsTextSelected(false);
				setSelectionCoords(null);
				return;
			}

			// Set a small delay before showing the toolbar to avoid flickering
			// during quick selections
			selectionTimeoutRef.current = setTimeout(() => {
				setIsTextSelected(true);

				if (window.getSelection) {
					// Get the browser's selection object
					const selection = window.getSelection();

					if (selection && selection.rangeCount > 0) {
						// Get the range of the selection
						const range = selection.getRangeAt(0);

						// Get the bounding rectangle of the selection
						const rect = range.getBoundingClientRect();

						// Get the parent container for relative positioning
						const containerElement = document.querySelector(".relative");
						if (!containerElement) return;

						const containerRect = containerElement.getBoundingClientRect();

						// Calculate position relative to the container
						const relativeX = rect.left - containerRect.left + rect.width / 2;
						const relativeY = rect.top - containerRect.top;

						// Ensure the toolbar stays within bounds
						const toolbarWidth = 300; // Approximate width of the toolbar
						const x = Math.max(
							0,
							Math.min(
								relativeX - toolbarWidth / 2,
								containerRect.width - toolbarWidth,
							),
						);

						// Position the toolbar above the selection
						const y = Math.max(0, relativeY - 5);

						setSelectionCoords({ x, y });
					}
				}
			}, 200); // 200ms delay
		},
	});

	useEffect(() => {
		if (editor && initialData?.content) {
			editor.commands.setContent(initialData.content);
		} else if (editor && !initialData?.content) {
			editor.commands.clearContent();
			editor.commands.setContent("<h1>New note</h1>");

			editor.commands.focus("end");
		}
	}, [editor, initialData?.content]);

	useEffect(() => {
		return () => {
			if (selectionTimeoutRef.current) {
				clearTimeout(selectionTimeoutRef.current);
			}
		};
	}, []);

	const handleSave = () => {
		if (onSave) {
			onSave({ title, content });
		}
	};

	const FloatingToolbar = useCallback(() => {
		if (!isTextSelected || !selectionCoords) return null;

		return (
			<div
				className="absolute z-50 bg-background border rounded-md shadow-md p-1 flex flex-wrap gap-1 animate-in fade-in zoom-in duration-200"
				style={{
					left: `${selectionCoords.x}px`,
					top: `${selectionCoords.y}px`,
					transform: "translateY(-100%)",
					maxWidth: "300px",
					marginTop: "-5px",
				}}
			>
				<ToolbarButton
					onClick={() => editor?.chain().focus().toggleBold().run()}
					active={editor?.isActive("bold") || false}
					disabled={!editor}
				>
					<Bold className="size-3" />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor?.chain().focus().toggleItalic().run()}
					active={editor?.isActive("italic") || false}
					disabled={!editor}
				>
					<Italic className="size-3" />
				</ToolbarButton>
				<ToolbarButton
					onClick={() =>
						editor?.chain().focus().toggleHeading({ level: 1 }).run()
					}
					active={editor?.isActive("heading", { level: 1 }) || false}
					disabled={!editor}
				>
					<Heading1 className="size-3" />
				</ToolbarButton>
				<ToolbarButton
					onClick={() =>
						editor?.chain().focus().toggleHeading({ level: 2 }).run()
					}
					active={editor?.isActive("heading", { level: 2 }) || false}
					disabled={!editor}
				>
					<Heading2 className="size-3" />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor?.chain().focus().toggleBulletList().run()}
					active={editor?.isActive("bulletList") || false}
					disabled={!editor}
				>
					<List className="size-3" />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor?.chain().focus().toggleOrderedList().run()}
					active={editor?.isActive("orderedList") || false}
					disabled={!editor}
				>
					<ListOrdered className="size-3" />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor?.chain().focus().toggleBlockquote().run()}
					active={editor?.isActive("blockquote") || false}
					disabled={!editor}
				>
					<Quote className="size-3" />
				</ToolbarButton>
				<ToolbarButton
					onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
					active={editor?.isActive("codeBlock") || false}
					disabled={!editor}
				>
					<Code className="size-3" />
				</ToolbarButton>
			</div>
		);
	}, [isTextSelected, selectionCoords, editor]);

	return (
		<Card className="w-full border-none gap-4 p-0">
			<CardContent className="relative m-0 p-0">
				<FloatingToolbar />

				<EditorContent
					editor={editor}
					className="h-[400px] overflow-y-auto prose max-w-none focus:outline-none text-sm p-4"
				/>
			</CardContent>
		</Card>
	);
}
