import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import {Database} from "@/database.types";

const supabaseUrl = "https://fknbeokwaarlpltrrnvx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrbmJlb2t3YWFybHBsdHJybnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2NzY5MzcsImV4cCI6MjA0OTI1MjkzN30.4ZctCWomMpIjIqwPf1k_q2VRrjCm4yZOEULjjZla_qg"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})