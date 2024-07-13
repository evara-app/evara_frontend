export default async function middlewareAuth(accessToken) {
  const { results } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2/front/profile/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json());
  const { user } = results || {};
  return user;
}
