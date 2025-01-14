import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Search, Tag } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />

        <div className="relative z-10 text-center">
          <h1 className="text-5xl tracking-tighter  sm:text-5xl md:text-7xl mb-4 font-extrabold">
            SnippetVault
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light mb-3 max-w-xl mx-auto leading-relaxed">
            Save Everything You Love, Effortlessly!
          </p>
          <p className="text-md sm:text-xl md:text-xl text-gray-400 font-light mb-4 max-w-2xl mx-auto leading-relaxed px-1">
            Organize your notes, code snippets, and links in one place. Boost
            your productivity and start saving today!
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

          {/* Feature Showcases */}
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }
                items-center gap-8 lg:gap-16 mb-20 sm:mb-32
              `}
            >
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                  <feature.icon className="h-8 w-8 text-white opacity-75" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 sm:py-32 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Get started in seconds. No sign-up required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-semibold mb-6">
                  {index + 1}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-16 right-0 h-[2px] bg-gradient-to-r from-gray-700 to-transparent" />
                )}

                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
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
            Join hundreds of developers who have already saving their important
            things in life!
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
      "Organize your snippets with beautiful pre-defined tags. Each tag comes with its own color scheme for quick visual recognition. Choose from categories like Code, Note, Idea, and more.",
    icon: Tag,
    image: "/tags.png", // Replace with actual screenshot
  },
  {
    title: "Quick Actions",
    description:
      "Access powerful actions with a single click. Copy, share, edit, or delete your snippets instantly. The intuitive interface keeps all actions readily available when you need them.",
    icon: Copy,
    image: "/Paste.png", // Replace with actual screenshot
  },
  {
    title: "Instant Search",
    description:
      "Find any snippet instantly with our powerful search feature. Search through titles, content, and tags seamlessly. Smart filtering ensures you find what you need, when you need it.",
    icon: Search,
    image: "/Search.png", // Replace with actual screenshot
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
