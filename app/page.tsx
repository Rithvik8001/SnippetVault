import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Search, Tag } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />

        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            SnippetVault
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            A new era of code organization.
            <br />
            Store. Share. Simplify.
          </p>
          <Link href="/dashboard">
            <Button className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full bg-white text-black hover:bg-gray-100 transition-all">
              Experience SnippetVault
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
              Incredibly powerful.
              <br />
              Remarkably simple.
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Every detail has been carefully crafted to enhance your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-16">
            {features.map((feature, index) => (
              <div key={index} className="relative group px-4">
                <div className="h-48 sm:h-64 mb-6 sm:mb-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center transform transition-transform group-hover:scale-105">
                  <feature.icon className="h-12 w-12 sm:h-16 sm:w-16 text-white opacity-75" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 sm:py-32 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto px-4">
            Join thousands of developers who have already elevated their code
            organization.
          </p>
          <Link href="/dashboard">
            <Button className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full bg-white text-black hover:bg-gray-100 transition-all">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <footer className="py-8 border-t border-gray-800 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 items-center justify-center">
          <div className="text-center text-gray-500">
            <p>© 2024 SnippetVault. All rights reserved.</p>
          </div>
          <div>
            <p className="text-center">Made with ❤️ by Rithvik</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Smart Tagging",
    description:
      "Organize your snippets with beautiful pre-defined tags. Each tag comes with its own color scheme for quick visual recognition.",
    icon: Tag,
  },
  {
    title: "Quick Actions",
    description:
      "Copy, share, edit, or delete your snippets with a single click. All actions are readily available when you need them.",
    icon: Copy,
  },
  {
    title: "Instant Search",
    description:
      "Find any snippet instantly with our powerful search feature. Search through titles, content, and tags seamlessly.",
    icon: Search,
  },
] as const;
