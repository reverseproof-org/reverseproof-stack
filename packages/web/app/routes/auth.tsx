import type { LoaderFunction } from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { createServerClient } from '@supabase/auth-helpers-remix';
import secureCookie from '../userSession';

export const loader: LoaderFunction = async ({ context, request }) => {
  const requestUrl = new URL(request.url);
  const { access_token, refresh_token, expires_in, token_type, type } =
    Object.fromEntries(Array.from(requestUrl.searchParams.entries()));

  if (
    !access_token ||
    !refresh_token ||
    token_type !== 'bearer' ||
    !type ||
    !expires_in
  ) {
    return redirect('/');
  }

  const response = new Response();
  const supabase = createServerClient(
    context.SUPABASE_URL as string,
    context.SUPABASE_ANON_KEY as string,
    { request, response }
  );
  const { data, error } = await supabase.auth.getUser(access_token);
  return json({ user: data?.user, error: error });
};

export default function Auth() {
  const loaderData = useLoaderData();
  console.log(loaderData);
  return <></>;
}
