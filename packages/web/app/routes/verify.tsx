import type { ActionFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useFetcher, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import querystring from 'querystring';
import url from 'url';

export const action: ActionFunction = ({ context, request }) => {};

export default function Verify() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  useEffect(() => {
    const { access_token } = querystring.parse(
      url.parse(window.location.href).hash!?.replace('#', '')
    );
    if (access_token) {
      fetcher.submit(
        { access_token: String(access_token) },
        { method: 'post' }
      );
      console.log(fetcher.data);
    }
    navigate('/', { replace: true });
  }, []);
  return <div className="form-container"></div>;
}
