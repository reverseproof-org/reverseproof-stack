import type { LinksFunction } from '@remix-run/cloudflare';
import styles from '../styles/css/components/header.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Header() {
  return (
    <div className="header-container">
      <h1 className="header-title">HEADER</h1>
    </div>
  );
}
