import { json, LoaderFunction, redirect } from '@remix-run/cloudflare';
import { createServerClient } from '@supabase/auth-helpers-remix';

export const loader: LoaderFunction = async ({ context, request }) => {
  const response = new Response();
  const supabaseClient = createServerClient(
    context.SUPABASE_URL as string,
    context.SUPABASE_ANON_KEY as string,
    { request, response }
  );
  const { error } = await supabaseClient.auth.signOut();
  return json({ error }, { headers: response.headers });
  // return redirect('/', { status: 301, headers: response.headers });
};

export default function Logout() {
  return <>xxx</>;
}
