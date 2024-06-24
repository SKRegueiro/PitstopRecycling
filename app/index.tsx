import { useEffect, useState } from "react";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import Auth from "@/components/Auth";
import Home from "@/components/Home";

//TODO: add image picker to upload photos https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=async-storage
export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <View />;
  }

  if (session && session.user)
    return (
      <View>
        <Home />
      </View>
    );

  if (!session && !isLoading)
    return (
      <View>
        <Auth />
      </View>
    );
}
