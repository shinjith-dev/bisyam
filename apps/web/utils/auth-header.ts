import cookies from "js-cookie";

export default function authHeader() {
  const userCookie = cookies.get("bisyam-user") as any;

  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);

      if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
      }
    } catch (err) {
      console.log(err);
    }
  }
  return {};
}
