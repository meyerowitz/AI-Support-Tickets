import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import CubeLogo from "@/components/landing/CubeLogo";

export const metadata: Metadata = {
  title: "Create Account - AI Support",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <CubeLogo className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold text-gray-900">
              AI SUPPORT
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Start managing tickets intelligently
          </p>
        </div>

        <div className="rounded-2xl border border-card-border bg-white p-8 shadow-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
