import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import Header, { links as headerLinks } from '~/components/header';
import styles from './styles/css/app.css';

export const links: LinksFunction = () => {
  return [...headerLinks(), { rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'ReverseProof',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
