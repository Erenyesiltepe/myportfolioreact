interface MediumItem {
  title: string;
  content: string;
  description: string;
  pubDate: string;
  link: string;
  thumbnail: string;
}

interface MediumResponse {
  items: MediumItem[];
}

export async function fetchMediumPosts() {
  // Replace with your Medium username
  const username = 'erenyesiltepeacc';
  const rssUrl = `https://medium.com/feed/@${username}`;
  
  // We need to use a CORS proxy since Medium's RSS feed doesn't support CORS
  const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Medium posts');
  }

  const data = await response.json() as MediumResponse;
  
  return data.items.map((item) => ({
    title: item.title,
    content: item.content,
    description: item.description,
    pubDate: item.pubDate,
    link: item.link,
    thumbnail: item.thumbnail,
  }));
} 