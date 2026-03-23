import axios from 'axios';

export const handler = async (event) => {
    try {
        const redditRss = 'https://www.reddit.com/r/SaaS+SideProject+startups/top.rss?t=month&limit=15';
        const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(redditRss)}`;

        // Axios já vem configurado com bons timeouts e tratativas de rede
        const res = await axios.get(url, { timeout: 8000 });
        const result = res.data;

        if (result.status !== 'ok') {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Gateway RSS falhou' }),
            };
        }

        const formattedData = {
            data: {
                children: result.items.map(item => ({
                    data: {
                        id: item.guid,
                        title: item.title,
                        author: item.author,
                        permalink: item.link.replace('https://www.reddit.com', ''),
                        ups: 100,
                        num_comments: 10,
                        thumbnail: item.thumbnail || ''
                    }
                })),
                after: null
            }
        };

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message }),
        };
    }
};
