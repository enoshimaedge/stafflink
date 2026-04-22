export const config = { runtime: 'edge' };

const KEYWORDS = {
  hotel: 'ホテル OR 旅館 OR 宿泊 OR 観光',
  medical: '病院 OR 医療 OR 看護 OR クリニック',
  both: 'ホテル OR 旅館 OR 病院 OR 医療 OR 観光'
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const industry = searchParams.get('industry') || 'hotel';
  const apiKey = process.env.VITE_GNEWS_API_KEY;
  const q = encodeURIComponent(KEYWORDS[industry] || KEYWORDS.hotel);
  
  const res = await fetch(
    `https://gnews.io/api/v4/search?q=${q}&lang=ja&country=jp&max=5&apikey=${apiKey}`
  );
  const data = await res.json();
  
  return new Response(JSON.stringify(data), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
