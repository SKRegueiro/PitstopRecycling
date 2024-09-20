import React from "react";
import Auth from "@/components/Auth";
import Home from "@/components/Home";
import useSession from "@/lib/hooks/useSession";

export default function Index() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  if (!isLoading && !session) {
    return <Auth />;
  }

  if (session) {
    return <Home />;
  }

  return null; // Ensure nothing is rendered prematurely
}
