// import debug from "debug";
// const log = debug("config:mongodb");
import mongoose from "mongoose";
import process from "node:process";

// log("process.env.MONGO:", process.env.MONGO);

const mongoConn = mongoose.createConnection(process.env.MONGO);

// process.on("SIGINT", async () => {
//   await mongoConn.close();
// });

// process.on("exit", async () => {
//   await mongoConn.close();
// });

export { mongoConn };
