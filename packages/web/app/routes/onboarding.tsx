import type { ActionFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useFetcher, useNavigate } from '@remix-run/react';
import { createServerClient } from '@supabase/auth-helpers-remix';
import { useEffect } from 'react';
import querystring from 'querystring';
import url from 'url';
import secureCookie from '../utils/httponly';

export const action: ActionFunction = async ({ context, request }) => {
  const response = new Response();
  const formData = await request.formData();
  const access_token = formData.get('access_token');
  const refresh_token = formData.get('refresh_token');
  const supabaseClient = createServerClient(
    context.SUPABASE_URL as string,
    context.SUPABASE_ANON_KEY as string,
    { request, response }
  );

  const { data } = await supabaseClient.auth.setSession({
    access_token: access_token as string,
    refresh_token: refresh_token as string,
  });

  secureCookie(response);

  // console.log(data);
  return json({}, { headers: response.headers });
};

export default function Onboarding() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  useEffect(() => {
    const { access_token, refresh_token } = querystring.parse(
      url.parse(window.location.href).hash!?.replace('#', '')
    );
    if (access_token) {
      fetcher.submit(
        {
          access_token: String(access_token),
          refresh_token: String(refresh_token),
        },
        { method: 'post' }
      );
      console.log(fetcher.data);
    }
    navigate('/', { replace: true });
  }, []);
  return <div className="form-container"></div>;
}
