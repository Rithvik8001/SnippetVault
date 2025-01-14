// types/index.ts
export type ContentType = "code" | "markdown" | "html" | "note" | "link";

export interface Paste {
  id?: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: number;
  language?: string;
  contentType: ContentType;
  url?: string;
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
