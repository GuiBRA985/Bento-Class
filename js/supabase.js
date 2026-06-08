const SUPABASE_URL = "https://ymbkyjdtjpegqelnirzi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltYmt5amR0anBlZ3FlbG5pcnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3ODM5NzUsImV4cCI6MjA5NjM1OTk3NX0.2qYLqsc8cgeTCf0edLf-7BeyeqWQcct2ONBGeFgmp4o";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
