// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Share2, Save } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text mb-6">
            SnippetVault
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your digital sanctuary for every piece of inspiration
          </p>
          <Link href="/dashboard">
            <Button className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 transition-all">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Code2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Store Code Snippets
              </h3>
              <p className="text-gray-600">
                Save and organize your code snippets with syntax highlighting
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Instantly</h3>
              <p className="text-gray-600">
                Share your snippets with anyone, anywhere, anytime
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Save className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto-Save</h3>
              <p className="text-gray-600">
                Never lose your work with automatic saving
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>© 2024 SnippetVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
