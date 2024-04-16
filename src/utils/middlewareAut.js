export default async function middlewareAuth(req) {
  const { results } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2/front/profile/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies.get("access")?.value}`,
      },
    }
  ).then((res) => res.json());
  const { user } = results || {};
  return user;
}
