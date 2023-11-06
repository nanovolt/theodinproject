import debug from "debug";
import { createClient } from "redis";
import process from "node:process";
const log = debug("config:redis");

// const redisClient = createClient({
//   url: "redis://127.0.0.1:6379",
// });

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

async function startRedis() {
  await redisClient
    .connect()
    .then(() => {
      log("redis connected");
    })
    .catch((err) => {
      console.log("failed to connect to redis");
      console.log(err);
    });
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
});

export { redisClient };
