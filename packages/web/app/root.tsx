import type {
  LinksFunction,
  MetaFunction,
  LoaderFunction,
} from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { createServerClient } from '@supabase/auth-helpers-remix';
import sessionContext from './sessionContext';

import Header, { links as headerLinks } from '~/components/header';
import styles from './styles/css/app.css';
import secureCookie from './utils/httponly';

export const links: LinksFunction = () => {
  return [...headerLinks(), { rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'ReverseProof',
  viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async ({ request, context }) => {
  const response = new Response();
  const supabaseClient = createServerClient(
    context.SUPABASE_URL as string,
    context.SUPABASE_ANON_KEY as string,
    { request, response }
  );
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  secureCookie(response);

  return json(
    { session },
    {
      headers: response.headers,
    }
  );
};

export default function App() {
  const { session } = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <sessionContext.Provider value={session}>
          <Header />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </sessionContext.Provider>
      </body>
    </html>
  );
}
