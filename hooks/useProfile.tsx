import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import { Session } from "@supabase/supabase-js";

const useProfile = (session: Session) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setIsLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, profile };
};

export default useProfile;
