const APIFY_TOKEN = process.env.APIFY_TOKEN;
const BASE_URL = "https://api.apify.com/v2/"
const ACTOR_ID = "macrocosmos~reddit-scraper";
const EXAMPLE_DATASET_ID = "05Mx3Rhs3zi9lXUfU";
const MEMORY = 128;


function buildURL(path, params) {
    const url = new URL(path.join('/'), BASE_URL);
    const queryParams = new URLSearchParams(params);
    const finalUrl = `${url}?${queryParams.toString()}`;
    console.info(finalUrl);
    return finalUrl;
}

async function runScraperAndReturnResultSync() {
    const response = await fetch(
        buildURL(
            ['actors', ACTOR_ID],
            { memory: MEMORY, build: "beta", token: APIFY_TOKEN }
        ), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "limit": 4,
            "proxyConfiguration": {
                "useApifyProxy": true,
                "apifyProxyGroups": [],
                "apifyProxyCountry": "US",
                "apifyProxySubdivision": "NY"
            },
            "sort": "hot",
            "subreddits": [
                "soccer"
            ]
        })
    });
    return response;
}

async function fetchExampleResult() {
    const response = await fetch(
        buildURL(['dataset', EXAMPLE_DATASET_ID, 'items'], { format: "json" }),
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${APIFY_TOKEN}`
            }
        }
    );
    return response;
}

export { fetchExampleResult, runScraperAndReturnResultSync }