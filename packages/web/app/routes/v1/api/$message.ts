import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';

export const loader: LoaderFunction = ({ request, params, context }) => {
  return json({ message: params.message });
};
