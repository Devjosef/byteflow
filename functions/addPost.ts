import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(express.json());

app.post('/add-post', async (req, res) => {
  const { title, content } = req.body;

  if (typeof title !== 'string' || typeof content !== 'string') {
    return res.status(400).json({ error: 'Both title and content must be provided as strings' });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const { data, error } = await supabase.from('posts').insert([{ title, content }]);

  if (error) {
    return res.status(500).json({ error: 'Failed to add post' });
  } else {
    return res.status(200).json({ message: 'The post was added successfully', data });
  }
});

export default app;

