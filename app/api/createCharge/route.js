export async function POST(req) {
  const body = await req.json();

  const response = await fetch("https://api.commerce.coinbase.com/charges", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CC-Api-Key": process.env.NEXT_PUBLIC_COINBASE_COMMERCE_API_KEY,
      "X-CC-Version": "2018-03-22",
    },
    body: JSON.stringify({
      name: body.name,
      description: body.description,
      pricing_type: body.pricing_type,
      local_price: body.local_price,
    }),
  });

  const data = await response.json();

  return new Response(JSON.stringify({ chargeId: data.data.id }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
