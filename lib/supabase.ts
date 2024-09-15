import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types"; //Extract to env

//TODO: Extract to env
const supabaseUrl = "https://yheytbqqhcmmeyhkbhim.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZXl0YnFxaGNtbWV5aGtiaGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4ODUxMDcsImV4cCI6MjAzNDQ2MTEwN30.Yf1ioSVDlX-UE8kh8LeXlDnKoROyzojWDoNiV6NLg-E";

//TODO: Extract to env
const accessBucketKeyId = "e034c63355f933a4a60748e7402123f9";
const secretBucketAccessKey = "47874ec6a7894b4d4ac6ba8e7fe7548e5099fa8587aba8088b8e974b12adc462";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
