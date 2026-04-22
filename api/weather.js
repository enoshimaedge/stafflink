export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city') || 'Tokyo,JP';
  const apiKey = process.env.VITE_OWM_API_KEY;
  
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ja`
  );
  const data = await res.json();
  
  return new Response(JSON.stringify(data), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
