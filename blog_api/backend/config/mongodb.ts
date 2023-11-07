import debug from "debug";
const log = debug("config:mongodb");
import mongoose from "mongoose";
import process from "node:process";

// log("process.env.MONGO:", process.env.MONGO);
async function startMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO, { connectTimeoutMS: 10000 });
  } catch (err) {
    log("mongoose failed to connet to Mongo Atlas");
    // log(err);
  }
}

startMongoDB();

mongoose.connection.on("connecting", () => {
  log("mongoose connecting to Mongo Atlas");
  // log(err);
});

mongoose.connection.on("connected", () => {
  log("mongoose establied connection with Mongo Atlas");
  // log(err);
});

mongoose.connection.on("disconnected", () => {
  log("mongoose disconnected from Mongo Atlas");
  // log(err);
});

// process.on("SIGINT", async () => {
//   await mongoConn.close();
// });

// process.on("exit", async () => {
//   await mongoConn.close();
// });

// export { mongoConn };
