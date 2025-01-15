// app/sign-up/page.tsx
"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { AuthError, AUTH_ERRORS } from "@/types/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError({ message: "Please fill in all fields" });
      return false;
    }

    if (!email.includes("@")) {
      setError({ message: AUTH_ERRORS.INVALID_EMAIL });
      return false;
    }

    if (password.length < 6) {
      setError({ message: AUTH_ERRORS.WEAK_PASSWORD });
      return false;
    }

    if (password !== confirmPassword) {
      setError({ message: AUTH_ERRORS.PASSWORDS_DONT_MATCH });
      return false;
    }

    return true;
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("already")) {
          throw new Error(AUTH_ERRORS.EMAIL_IN_USE);
        }
        throw signUpError;
      }

      router.push("/sign-in?message=Check your email to confirm your account");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : AUTH_ERRORS.DEFAULT;
      setError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);
      setError(null);

      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (googleError) throw new Error(AUTH_ERRORS.GOOGLE_AUTH_ERROR);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : AUTH_ERRORS.DEFAULT;
      setError({ message: errorMessage });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-500">
            Join SnippetVault to start organizing your code
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          {/* Google Sign Up */}
          <div className="mb-6">
            <button
              onClick={handleGoogleSignUp}
              disabled={googleLoading}
              className="w-full h-12 px-4 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.266 9.804C6.203 7.063 8.763 5.07 11.798 5.07c1.624 0 3.081.58 4.217 1.529l3.237-3.237C17.257 1.572 14.689.333 11.798.333 7.167.333 3.201 3.026 1.33 6.96l3.936 2.844z"
                />
                <path
                  fill="#34A853"
                  d="M16.015 18.47c-1.136.949-2.593 1.529-4.217 1.529-3.035 0-5.595-1.993-6.532-4.734L1.33 18.11c1.871 3.934 5.837 6.627 10.468 6.627 2.89 0 5.458-1.239 7.454-3.028l-3.237-3.237z"
                />
                <path
                  fill="#4A90E2"
                  d="M21.802 12c0-.816-.065-1.611-.197-2.373H11.798v4.476h5.617c-.242 1.289-1.009 2.477-2.148 3.258l3.237 3.237c1.899-1.753 2.998-4.335 2.998-7.598z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.266 15.265C5.066 14.547 4.955 13.785 4.955 13s.111-1.547.311-2.265L1.33 7.891C.478 9.473 0 11.186 0 13s.478 3.527 1.33 5.109l3.936-2.844z"
                />
              </svg>
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email Sign Up Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border-none focus:ring-2 focus:ring-gray-900"
                required
                minLength={6}
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
                {error.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-gray-900 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
