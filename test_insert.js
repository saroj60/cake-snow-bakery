import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqiiodgbrajwzbqfvfrx.supabase.co';
const supabaseAnonKey = 'sb_publishable_r4RUixrVRBhXYP9EMzcGjA_XIn9W15g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  const newProduct = {
    name: 'Test Product',
    price: 100,
    description: 'Test description',
    image: '',
    category: 'Cakes',
    occasion: 'General / Any',
    isActive: true,
    isPerLb: false
  };

  const { data, error } = await supabase.from('products').insert([newProduct]).select().single();
  if (error) {
    console.error("Insert Error:", error);
  } else {
    console.log("Insert Success:", data);
  }
}

testInsert();
