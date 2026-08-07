import { fetchExampleResult, runScraperAndReturnResultSync, getResponse } from "./integrations/index.js";
import { mapJSONL } from "./utils/index.js";

async function getMediaCtx() {
    let response;
    if (process.env.NODE_ENV === 'production') {
        response = await runScraperAndReturnResultSync();
    } else {
        response = await fetchExampleResult();
    }

    if (!response.ok) {
        console.error("Failed to get response", response.statusText);
        throw Error("Could not get response");
    }
    const posts = await response.json();
    return mapJSONL(posts, ['username', 'title'], ':');
}


async function run() {
    try {
        const ctx = await getMediaCtx();
        if (ctx) {
            const response = await getResponse(JSON.stringify(ctx));
            console.log(response);
        }
    } catch (e) {
        console.error("Encountered an error", e);
    }
}

run();