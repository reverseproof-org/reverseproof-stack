import { Hono } from 'hono';
import { jwt } from 'hono/jwt';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_JWT_SECRET: string;
}

const app = new Hono<{ Bindings: Env }>();

app.use('/*', (c, next) => {
  const auth = jwt({
    secret: c.env.SUPABASE_JWT_SECRET,
  });
  return auth(c, next);
});

app.get('/', (c) => {
  return c.text('Hello world');
});
app.get('/m', (c) => {
  return c.text('mmmmm');
});

export default app;
