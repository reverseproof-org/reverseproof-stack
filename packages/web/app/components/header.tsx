import type { LinksFunction } from '@remix-run/cloudflare';
import { useFetcher } from '@remix-run/react';
import { useContext } from 'react';
import userContext from '~/userSession';
import styles from '../styles/css/components/header.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Header() {
  const user = useContext(userContext);
  return (
    <div className="header-container">
      <h3 className="header-title">HEADER</h3>
      <div className="user-status">{user ? user['email'] : 'logged out'}</div>
    </div>
  );
}
