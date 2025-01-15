// types/index.ts
export type ContentType = "code" | "markdown" | "html" | "note" | "link";

// types/index.ts
// types/index.ts
export interface Paste {
  id?: string;
  user_id?: string;
  title: string;
  content: string;
  tag: string;
  contentType?: string; // matches content_type in database
  language?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const CONTENT_TYPES = [
  {
    id: "code" as ContentType,
    label: "Code",
    placeholder: "Enter your code here...",
  },
  {
    id: "markdown" as ContentType,
    label: "Markdown",
    placeholder: "Write your markdown content here...",
  },
  {
    id: "html" as ContentType,
    label: "HTML/CSS",
    placeholder: "Enter HTML/CSS code here...",
  },
  {
    id: "note" as ContentType,
    label: "Note",
    placeholder: "Write your note here...",
  },
  {
    id: "link" as ContentType,
    label: "Link",
    placeholder: "Enter URL here...",
  },
] as const;
