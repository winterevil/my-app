import axios from "axios";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return new Response(
      JSON.stringify({ error: "Username is required" }),
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    return new Response(
      JSON.stringify({ error: "Failed to fetch repositories from GitHub" }),
      { status: 500 }
    );
  }
}
