import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import CubeLogo from "@/components/landing/CubeLogo";

export const metadata: Metadata = {
  title: "Log in - AI Support",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2"
            >
              <CubeLogo className="h-8 w-8 text-primary" />
              <span className="text-lg font-bold text-gray-900">
                AI SUPPORT
              </span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to your account to continue
            </p>
          </div>
          <LoginForm />
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-accent/5 via-purple-50 to-primary/5 lg:flex">
        <div className="relative max-w-md px-12">
          <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08)_0%,transparent_70%)]" />
          <div className="relative">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-2xl ${
                    i % 3 === 0
                      ? "bg-accent/20"
                      : i % 3 === 1
                      ? "bg-primary/15"
                      : "bg-yellow-200/30"
                  } ${
                    i === 4 ? "h-24 scale-110" : "h-20"
                  } transition-transform hover:scale-105`}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-3xl font-bold text-accent-dark">AI-Powered</p>
              <p className="mt-2 text-gray-500">
                Intelligent ticket management at your fingertips
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
