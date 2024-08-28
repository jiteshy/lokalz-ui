// Test endpoint
export async function POST(request: Request) {
  const res = await request.json();
  console.log("Response.json({ res })-----", { res });
  return Response.json({ res });
}
