import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { createBrowserClient } from '@supabase/auth-helpers-remix';
import { useState } from 'react';

export const loader: LoaderFunction = ({ context }) => {
  return json({
    env: {
      supabase_url: context.SUPABASE_URL,
      supabase_anon_key: context.SUPABASE_ANON_KEY,
    },
  });
};

export default function Test() {
  const { env } = useLoaderData();
  const [supabase] = useState(() =>
    createBrowserClient(env.supabase_url, env.supabase_anon_key)
  );
  return <></>;
}
