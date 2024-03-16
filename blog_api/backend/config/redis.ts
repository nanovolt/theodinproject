import debug from "debug";
import { createClient } from "redis";
import process from "node:process";
const log = debug("config:redis");

// const redisClient = createClient({
//   url: "redis://127.0.0.1:6379",
// });

const redisClient = createClient({
  url: process.env.REDIS_URL,
  // pingInterval: 60000,
});

const timer = setInterval(async () => {
  try {
    await redisClient.ping();
    console.log("pinged redis");
  } catch (err) {
    console.error("Ping Interval Error", err);
  }
}, 1000 * 60 * 10);

async function startRedis() {
  try {
    await redisClient.connect();
    log("redis client established connection with Fly.io Redis Upstash");
  } catch (err) {
    log("redis client failed to connect to Fly.io Redis Upstash");
    log(err);
  }
}

startRedis();

// process.on("SIGINT", async () => {
//   log("redis client quit start");

//   // log("redis isOpen:", redisClient.isOpen);
//   // const result = await redisClient.quit();
//   // log(result);
//   // if (redisClient.isOpen) {
//   // await redisClient.QUIT();
//   // }

//   log("redis client quit");
//   // log("redis isOpen:", redisClient.isOpen);
// });

process.on("exit", async () => {
  await redisClient.quit();

  // make sure to `clearInterval` when you close the client
  clearInterval(timer);
  redisClient.disconnect();
});

export { redisClient };
