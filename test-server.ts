import express from "express";

const app = express();
app.use(express.json());

app.post("/api/n8n-webhook", async (req, res) => {
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
      console.error(`n8n error: ${response.status} ${text}`);
      return res.status(response.status).send(text);
    }

    if (contentType && contentType.includes('application/json')) {
      res.json(JSON.parse(text));
    } else {
      res.send(text);
    }
  } catch (error) {
    console.error('Error proxying chat request:', error);
    res.status(500).json({ error: 'Failed to proxy request', details: error.message });
  }
});

app.listen(3001, async () => {
  console.log("Server running on 3001");
  try {
    const r = await fetch('http://localhost:3001/api/n8n-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({chatInput: 'hola'})
    });
    console.log(r.status);
    console.log(await r.text());
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
});
