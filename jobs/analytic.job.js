const dotenv = require("dotenv")
const Bull = require("bull");

dotenv.config()
const { REDIS_HOST, REDIS_PORT, UPSTASH_ENDPOINT, UPSTASH_PASSWORD, UPSTASH_PORT, APP } = process.env

const localConfig = {
    host: REDIS_HOST,
    port: Number(REDIS_PORT)
}

const prodConfig = {
    url: `rediss://default:${UPSTASH_PASSWORD}@${UPSTASH_ENDPOINT}:${UPSTASH_PORT}`,
}

const redisConfig = (APP == "local") ? localConfig : prodConfig

const eventQueue = new Bull("eventQueue", {
    redis: {
        host: REDIS_HOST,
        port: Number(REDIS_PORT)
    }
});

eventQueue.process(async (job) => {
    console.log("config is: ", APP)
    console.log("config is: ", JSON.stringify(redisConfig))
    // Process the job here
    console.log(`Processing job with data: ${JSON.stringify(job.data)}`);
    await new Promise((resolve) => setTimeout(()=>{
        console.log("resolved")
        resolve()
    }, 5000))
    return `Job completed with data: ${job.data}`;
}).catch((error) => console.log(error));

eventQueue.on("error", (err) => {
    console.error("Redis connection error:", err);
});

eventQueue.on("stalled", (job) => {
    console.warn(`Job ${job.id} stalled and will be retried`);
});

eventQueue.on("failed", async (job, error) => {
    console.error(`Job ${job.id} failed with error: ${error.message}`);
});

module.exports = eventQueue;
