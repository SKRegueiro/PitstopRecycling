import { createContext, ReactNode, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const AuthContext = createContext<{
  isLoading: boolean;
  session: Session | null;
}>({
  isLoading: true,
  session: null
});

type AuthContextProps = {
  children: ReactNode;
};

export function AuthProvider(props: AuthContextProps) {
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

  const value = { isLoading, session };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
