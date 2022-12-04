import type { LinksFunction, ActionFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Form } from '@remix-run/react';
import { createServerClient } from '@supabase/auth-helpers-remix';
import styles from '~/styles/css/routes/login.css';
import secureCookie from '~/utils/httponly';

export const action: ActionFunction = async ({ request, context }) => {
  const formData = await request.formData();
  const loginEmail = formData.get('email');
  const loginPassword = formData.get('password');

  const response = new Response();
  const supabaseClient = createServerClient(
    context.SUPABASE_URL as string,
    context.SUPABASE_ANON_KEY as string,
    { request, response }
  );

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: String(loginEmail),
    password: String(loginPassword),
  });
  secureCookie(response);

  return json(
    { data, error },
    {
      headers: response.headers,
    }
  );
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Login() {
  return (
    <div className="login-container">
      <Form method="post">
        <input type="text" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <input type="submit" />
      </Form>
    </div>
  );
}
