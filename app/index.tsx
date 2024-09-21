import React from "react";
import Auth from "@/components/Auth";
import Home from "@/components/Home";
import useProfile from "@/lib/hooks/useProfile";

export default function Index() {
  const { isLoading, profile } = useProfile();

  if (isLoading) {
    return null;
  }

  if (!isLoading && !profile) {
    return <Auth />;
  }

  if (profile) {
    return <Home profile={profile} />;
  }

  return null;
}
// TS2322: Type '{ created_at: string; email: string | null; id: number; name: string | null; type: string | null; } | null | undefined' is not assignable to type '{ created_at: string; email: string; id: number; name: string; type: "Driver" | "Admin" | "Customer"; }'.
//     Type 'undefined' is not assignable to type '{ created_at: string; email: string; id: number; name: string; type: "Driver" | "Admin" | "Customer"; }'.
