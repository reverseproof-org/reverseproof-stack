import type { LinksFunction } from '@remix-run/cloudflare';
import { useContext } from 'react';
import sessionContext from '~/sessionContext';
import styles from '../styles/css/components/header.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Header() {
  const session = useContext(sessionContext);
  return (
    <div className="header-container">
      <h3 className="header-title">HEADER</h3>
      <div className="user-status">{session ? 'hello' : 'logged out'}</div>
    </div>
  );
}
