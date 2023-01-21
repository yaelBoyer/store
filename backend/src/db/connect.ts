import config from "config";
import mongoose from "mongoose";
// import log from "../logger";

// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
  
// }
function connect() {
  const dbUri = config.get("dbUri") as string;
console.log(dbUri);
  return mongoose
    .connect(dbUri)
    .then(() => {
      // log.info("Database connected");
    })
    .catch((error) => {
      debugger;
      // log.error(error);
      process.exit(1);
    });
}

export default connect;
