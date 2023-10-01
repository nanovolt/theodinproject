import debug from "debug";
import mongoose from "mongoose";

const log = debug("config:mongodb");

log("process.env.MONGO:", process.env.MONGO);

const mongoConn = mongoose.createConnection(process.env.MONGO);

export { mongoConn };
