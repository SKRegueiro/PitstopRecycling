import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yheytbqqhcmmeyhkbhim.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZXl0YnFxaGNtbWV5aGtiaGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4ODUxMDcsImV4cCI6MjAzNDQ2MTEwN30.Yf1ioSVDlX-UE8kh8LeXlDnKoROyzojWDoNiV6NLg-E";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
