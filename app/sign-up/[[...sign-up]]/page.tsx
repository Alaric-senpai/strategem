import { SignUp, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 relative">
      {/* Back Button (Only Icon) */}
      <Link href="/" className="absolute top-6 left-6 text-gray-700 hover:text-gray-900">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">Join Us!</h1>
      <p className="text-gray-600 mb-6">Sign up to get started.</p>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <SignUp 
        
        />
      </div>
    </div>
  );
}
