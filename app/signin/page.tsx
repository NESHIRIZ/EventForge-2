import { Suspense } from "react";
import { Container } from "../components/container";
import { SigninClient } from "./signin-client";

export default function SigninPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] py-12 md:py-20 flex items-center justify-center overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -ml-48 -mb-48" />
      
      <Container>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <SigninClient />
        </Suspense>
      </Container>
    </main>
  );
}

