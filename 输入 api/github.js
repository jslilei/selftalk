export default async function handler(req, res) {
  const G_TOKEN = process.env.G_TOKEN; 
  const path = req.url.replace('/api/github', '');
  
  try {
    const response = await fetch(`https://api.github.com${path}`, {
      method: req.method,
      headers: {
        'Authorization': `token ${G_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Gwitter-Proxy',
        'Content-Type': 'application/json',
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'GitHub Proxy Error' });
  }
}
