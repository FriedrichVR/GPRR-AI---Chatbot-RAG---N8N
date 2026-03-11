import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://n8n.srv1202174.hstgr.cloud/webhook/58fce02b-5157-4f02-a652-0ff5eaba59c2/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const contentType = response.headers.get('content-type');
    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).send(text);
    }

    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    
    return res.send(text);
  } catch (error) {
    console.error('Error proxying to n8n:', error);
    return res.status(500).json({ error: 'Failed to connect to n8n' });
  }
}
