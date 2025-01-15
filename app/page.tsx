import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Search, Tag } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black" />

        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl mb-4 font-bold tracking-tight">
            SnippetVault
          </h1>
          <p className="text-2xl md:text-4xl text-gray-400 font-light mb-3 max-w-3xl mx-auto leading-tight">
            Save Everything You Love, Effortlessly!
          </p>
          <p className="text-lg md:text-xl text-gray-500 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            Organize your notes, code snippets, and links in one place. Boost
            your productivity and start saving today!
          </p>
          <Link href="/dashboard">
            <Button className="px-8 py-6 text-lg rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300">
              Experience SnippetVault
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 md:py-48">
        <div className="container mx-auto px-4">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-semibold mb-8 tracking-tight">
              Incredibly powerful.
              <br />
              Remarkably simple.
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Every detail has been carefully crafted to enhance your workflow.
            </p>
          </div>

          {/* Feature Showcases */}
          {features.map((feature, index) => (
            <div key={index} className="mb-48 last:mb-0">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 backdrop-blur-xl">
                  <feature.icon className="h-10 w-10 text-white opacity-75" />
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-xl text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-32 md:py-48 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-semibold mb-8 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Get started in seconds. No sign-up required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-2xl font-semibold mb-8">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-semibold mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 md:py-48 bg-gradient-to-b from-neutral-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-semibold mb-8 tracking-tight">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Join hundreds of developers who have already saving their important
            things in life!
          </p>
          <Link href="/dashboard">
            <Button className="px-8 py-6 text-lg rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <footer className="py-12 border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <p className="text-gray-500">
              © 2024 SnippetVault. All rights reserved.
            </p>
            <p className="text-gray-500">Made with ❤️ by Rithvik</p>
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
      "Organize your snippets with beautiful pre-defined tags. Each tag comes with its own color scheme for quick visual recognition. Choose from categories like Code, Note, Idea, and more.",
    icon: Tag,
  },
  {
    title: "Quick Actions",
    description:
      "Access powerful actions with a single click. Copy, share, edit, or delete your snippets instantly. The intuitive interface keeps all actions readily available when you need them.",
    icon: Copy,
  },
  {
    title: "Instant Search",
    description:
      "Find any snippet instantly with our powerful search feature. Search through titles, content, and tags seamlessly. Smart filtering ensures you find what you need, when you need it.",
    icon: Search,
  },
] as const;

const steps = [
  {
    title: "Create a Paste",
    description:
      "Click the 'New Paste' button and enter your content. Add a title and select a tag to categorize your paste.",
  },
  {
    title: "Organize & Edit",
    description:
      "Your pastes are automatically saved and organized. Edit them anytime with a single click.",
  },
  {
    title: "Share & Access",
    description:
      "Share your pastes instantly or access them from any device. No account needed.",
  },
] as const;
