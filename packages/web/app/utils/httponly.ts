export default function secureCookie(response: Response): Response {
  if (!response.headers.has('set-cookie')) {
    response.headers.set(
      'set-cookie',
      response.headers.get('set-cookie')! +
        `; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}; HttpOnly`
    );
  }
  return response;
}
