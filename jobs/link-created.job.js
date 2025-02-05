const dotenv = require("dotenv")
const Bull = require("bull");
const Analytics = require("../models/analytic.model")

dotenv.config()
const { REDIS_HOST, REDIS_PORT, UPSTASH_ENDPOINT, UPSTASH_PASSWORD, UPSTASH_PORT, APP } = process.env

// const localConfig = {
//     host: REDIS_HOST,
//     port: Number(REDIS_PORT)
// }

const prodConfig = {
    url: `rediss://default:${UPSTASH_PASSWORD}@${UPSTASH_ENDPOINT}:${UPSTASH_PORT}`,
}

const linkCreatedQueue = new Bull("linkCreatedQueue", {
    redis: prodConfig
});


linkCreatedQueue.process(async () => {
    const tag = "[analytic.job.js][process]"
    console.log(`${tag} Processing link job`)

    try{
        await Analytics.create({ type: "link" })
    }catch(error){
        console.log(`${tag} Error:`, error);
    }

});

linkCreatedQueue.on("error", (err) => {
    console.error("Redis connection error:", err);
});

linkCreatedQueue.on("stalled", (job) => {
    console.warn(`Job ${job.id} stalled and will be retried`);
});

linkCreatedQueue.on("failed", async (job, error) => {
    console.error(`Job ${job.id} failed with error: ${error.message}`);
});

module.exports = linkCreatedQueue;
