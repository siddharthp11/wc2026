import { fetchExampleResult, runScraperAndReturnResultSync } from "./api.js";

try {
    let response;
    if (process.env.NODE_ENV === 'production') {
        response = await runScraperAndReturnResultSync();
    } else {
        response = await fetchExampleResult();
    }
    if (!response.ok) {
        console.error("Failed to get response", response.statusText);
    } else {
        const data = await response.json();
        console.log(data);
    }
} catch (e) {
    console.error("Encountered an error", e)
}
