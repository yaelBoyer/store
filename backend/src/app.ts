import express from "express";
// import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";
import config from "config";
const cors = require('cors');

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*'
}));

app.use('/uploads', express.static('uploads'))

app.listen(port, host, () => {
  // log.info(`Server listing at http://${host}:${port}`);

  connect();

  routes(app);
});
