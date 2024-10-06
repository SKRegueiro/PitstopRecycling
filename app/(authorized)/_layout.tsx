import { Redirect, Stack } from "expo-router";
import useProfile from "@/lib/hooks/useProfile";
import React, { StrictMode } from "react";

const AppLayout = () => {
  const { isLoading, profile } = useProfile();

  if (!isLoading && !profile) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <StrictMode>
      <Stack />
    </StrictMode>
  );
};

export default AppLayout;
