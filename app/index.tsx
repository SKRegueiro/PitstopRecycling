import React from "react";
import Auth from "@/components/Auth";
import Home from "@/components/Home";
import useProfile from "@/lib/hooks/useProfile";

export default function Index() {
  const { isLoading, profile } = useProfile();

  //TODO: implement RN Reanimated to add some cool animations
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
