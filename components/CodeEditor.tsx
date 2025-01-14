// components/CodeEditor.tsx
"use client";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  placeholder?: string;
}

export default function CodeEditor({
  value,
  onChange,
  language,
  placeholder,
}: CodeEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="relative h-full w-full rounded-lg bg-gray-50">
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full p-4 font-mono text-sm resize-none bg-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-lg"
        spellCheck="false"
        style={{
          minHeight: "300px",
        }}
      />
    </div>
  );
}
