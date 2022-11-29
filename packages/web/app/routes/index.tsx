import type {
  LinksFunction,
  LoaderFunction,
  ActionFunction,
} from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Form, useLoaderData, useActionData } from '@remix-run/react';
import styles from '../styles/css/routes/index.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Index() {
  return (
    <div className="hero-container">
      hifjds
      <Form method="post" action="/?index">
        <input type="text" />
        <input type="submit" />
      </Form>
    </div>
  );
}
