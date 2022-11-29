import type { LinksFunction } from '@remix-run/cloudflare';
import styles from '../styles/css/routes/index.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Index() {
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
