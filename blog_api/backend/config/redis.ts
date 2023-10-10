import debug from "debug";
import { createClient } from "redis";
// import { Redis } from "ioredis";
// import process from "node:process";
const log = debug("config:redis");

const redisClient = createClient();
// const redisClient = new Redis();

async function startRedis() {
  await redisClient.connect().catch(console.log);
  log("redis connected");
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

// process.on("exit", async () => {
//   await redisClient.quit();
// });

export { redisClient };
