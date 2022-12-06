import type { LinksFunction, ActionFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useNavigate, useActionData, Form } from '@remix-run/react';
import { createServerClient } from '@supabase/auth-helpers-remix';
import { useState, useEffect } from 'react';
import querystring from 'querystring';
import url from 'url';
import secureCookie from '../utils/httponly';
import styles from '../styles/css/routes/set-password.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const action: ActionFunction = async ({ context, request }) => {
  const { access_token, refresh_token, password, confirm_password } =
    Object.fromEntries(await request.formData());

  if (password !== confirm_password) {
    return json({ error: 'passwords do not match' });
  }

  const response = new Response();
  const supabaseClient = createServerClient(
    context.SUPABASE_URL as string,
    context.SUPABASE_ANON_KEY as string,
    { request, response }
  );
  const { data: authData, error: authError } =
    await supabaseClient.auth.setSession({
      access_token: access_token as string,
      refresh_token: refresh_token as string,
    });
  const { data: updateData, error: updateError } =
    await supabaseClient.auth.updateUser({
      password: password as string,
    });
  secureCookie(response);
  return json(
    { authData, authError, updateData, updateError },
    { headers: response.headers }
  );
};

export default function setPassword() {
  const [access_token, setAccess_token] = useState('');
  const [refresh_token, setRefresh_token] = useState('');
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    const { access_token, refresh_token } = querystring.parse(
      url.parse(window.location.href).hash!?.replace('#', '')
    );
    if (!access_token || !refresh_token) {
      navigate('/', { replace: true });
    }
    setAccess_token((access_token as string) || '');
    setRefresh_token((refresh_token as string) || '');
  }, []);

  return (
    <div className="form-container">
      <Form method="post">
        <input type="hidden" name="access_token" value={access_token} />
        <input type="hidden" name="refresh_token" value={refresh_token} />
        <input type="password" name="password" placeholder="password" />
        <input
          type="password"
          name="confirm_password"
          placeholder="confirm password"
        />
        <input type="submit" />
      </Form>
      <p>{JSON.stringify(actionData) ?? 'no data'}</p>
    </div>
  );
}
