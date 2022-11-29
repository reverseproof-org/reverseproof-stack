import type { LinksFunction } from '@remix-run/cloudflare';
import { Form } from '@remix-run/react';
import styles from '../styles/css/routes/index.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Index() {
  return <div className="hero-container">hifjds</div>;
}
