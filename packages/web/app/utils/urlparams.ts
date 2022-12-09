export default function getUrlParams(url: string): {
  [string: string]: string;
} {
  const urlObject = new URL(url);
  const res = Object.fromEntries(Array.from(urlObject.searchParams.entries()));
  return res;
}
