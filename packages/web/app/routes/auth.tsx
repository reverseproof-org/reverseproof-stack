import type {
  LinksFunction,
  LoaderFunction,
  ActionFunction,
} from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/cloudflare';
import { useLoaderData, useActionData, Form } from '@remix-run/react';
import { createServerClient } from '@supabase/auth-helpers-remix';
import getUrlParams from '~/utils/urlparams';
import secureCookie from '../utils/httponly';
import styles from '../styles/css/routes/auth.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader: LoaderFunction = async ({ context, request }) => {
  const { access_token, refresh_token, expires_in, token_type, type } =
    getUrlParams(request.url);

  if (
    !access_token ||
    !refresh_token ||
    token_type !== 'bearer' ||
    !type ||
    !expires_in
  ) {
    return redirect('/', 301);
  }

  const response = new Response();
  const supabase = createServerClient(
    context.SUPABASE_URL as string,
    context.SUPABASE_ANON_KEY as string,
    { request, response }
  );
  const { data, error } = await supabase.auth.getUser(access_token);
  return json({
    data: data?.user,
    error: error,
    access_token,
    refresh_token,
    type,
  });
};

export const action: ActionFunction = async ({ context, request }) => {
  const { password, confirm_password } = Object.fromEntries(
    await request.formData()
  );
  if (!password || !confirm_password) {
    return json({ error: 'Password and confirmation required' });
  }
  if (password !== confirm_password) {
    return json({ error: 'The two fields must be equal' });
  }
  const { access_token, refresh_token } = getUrlParams(request.url);
  const response = new Response();
  const supabaseClient = createServerClient(
    context.SUPABASE_URL as string,
    context.SUPABASE_ANON_KEY as string,
    { request, response }
  );
  const { data: sessionData, error: sessionError } =
    await supabaseClient.auth.setSession({
      access_token,
      refresh_token,
    });
  secureCookie(response);
  const { data: updateData, error: updateError } =
    await supabaseClient.auth.updateUser({
      password: password as string,
    });
  secureCookie(response);
  if (sessionError || updateError) {
    return json({ sessionData, sessionError, updateError });
  }
  return redirect('/', { headers: response.headers, status: 303 });
};

function AuthComponent() {
  const { data, error, access_token, refresh_token, type } = useLoaderData();
  const actionData = useActionData();
  if (type === 'invite') {
    return (
      <>
        <Form method="post" className="auth-form create-password-form">
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
          />
          <input type="submit" />
          {actionData?.error ? (
            <p style={{ color: 'red' }}>{actionData?.error}</p>
          ) : null}
        </Form>
      </>
    );
  }
  return <></>;
}

export default function AuthPage() {
  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <AuthComponent />
      </div>
    </div>
  );
}
