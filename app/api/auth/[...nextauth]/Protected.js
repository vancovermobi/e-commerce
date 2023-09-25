import { authOptions } from "./authOptions";
import { getServerSession } from "next-auth/next"
import { limiter } from "../config/limiter";

export default async function Protected(req, res) {
  const origin = req.headers.get('origin')

  const remaining = await limiter.removeTokens(1)
  console.log("remaining: ", remaining);

  if(remaining < 0 ) {
    return new NextResponse(null, {
      status: 429,
      statusText: "Too Many Request",
      headers: {
        'Access-Control-Allow-Origin': origin || "*",
        'Content-Type': 'text/plain',
      }
    })
  }
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  res.status(200).json({ name: " Hello from Protected"})
  return res.json({
    message: 'Success',
  })
}
