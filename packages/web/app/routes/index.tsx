import type { LinksFunction } from '@remix-run/cloudflare';
import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import querystring from 'querystring';
import url from 'url';
import styles from '../styles/css/routes/index.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    const { access_token, refresh_token, type, token_type, expires_in } =
      querystring.parse(
        url.parse(window.location.href).hash!?.replace('#', '')
      );
    if (
      access_token &&
      refresh_token &&
      type &&
      token_type === 'bearer' &&
      expires_in
    ) {
      navigate(
        `/auth?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}&token_type=${token_type}&type=${type}`,
        { replace: true }
      );
    }
  }, []);
  return (
    <div className="hero-container">
      <div className="hero-title">
        <h1>HERO</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus,
          repudiandae!
        </p>
      </div>
    </div>
  );
}
