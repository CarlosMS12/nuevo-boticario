import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://udlzzxvyifesjrergedu.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkbHp6eHZ5aWZlc2pyZXJnZWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NzAwODIsImV4cCI6MjA2ODQ0NjA4Mn0.d2yoAMTiSm7bSxnynUWM5YAnn0aJfLIC1iisJy3KMs4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
