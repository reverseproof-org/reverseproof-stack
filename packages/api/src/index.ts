import { Hono } from 'hono';
import { poweredBy } from 'hono/powered-by';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello world');
});

export default app;
