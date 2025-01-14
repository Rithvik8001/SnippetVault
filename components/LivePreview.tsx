// components/LivePreview.tsx
"use client";
import { useEffect, useRef } from "react";

interface LivePreviewProps {
  content: string;
}

export default function LivePreview({ content }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(content);
        doc.close();
      }
    }
  }, [content]);

  return (
    <div className="h-full rounded-lg border border-gray-200 overflow-hidden bg-white">
      <iframe
        ref={iframeRef}
        title="Preview"
        className="w-full h-full"
        sandbox="allow-scripts"
      />
    </div>
  );
}
