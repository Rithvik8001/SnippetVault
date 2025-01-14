// components/CodeEditor.tsx
"use client";
import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  placeholder?: string;
}

export default function CodeEditor({
  value,
  onChange,
  language = "javascript",
  placeholder,
}: CodeEditorProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [value, language]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue =
        value.substring(0, start) + "    " + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="relative min-h-[300px] w-full rounded-lg border border-gray-200 overflow-hidden font-mono bg-white">
      {/* Line Numbers */}
      <div className="absolute left-0 top-0 w-[40px] h-full bg-gray-50 border-r border-gray-200">
        {Array.from({ length: value.split("\n").length || 1 }).map((_, i) => (
          <div
            key={i}
            className="text-xs text-gray-400 text-right pr-2 leading-6"
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Main Editor Area */}
      <div className="relative ml-[40px]">
        {/* Code Input */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full min-h-[300px] p-4 text-sm resize-none focus:outline-none leading-6 bg-transparent text-gray-900 selection:bg-blue-200 selection:text-gray-900"
          style={{
            fontFamily: "inherit",
            caretColor: "black",
          }}
          spellCheck="false"
          autoCapitalize="off"
          autoCorrect="off"
        />

        {/* Syntax Highlighting Layer */}
        <pre className="!m-0 absolute top-0 left-0 w-full h-full pointer-events-none">
          <code
            ref={codeRef}
            className={`language-${language} !p-4 !m-0 selection:bg-blue-200 selection:text-gray-900`}
          >
            {value || " "}
          </code>
        </pre>
      </div>
    </div>
  );
}
