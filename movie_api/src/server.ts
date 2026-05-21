import express from "express";
import { port, NODE_ENV } from "./config/db";
const app = express();
//global error handler and routes
app.use("/api/movie", (req, res) => {

});


app.listen(port, () => {
  console.log(`Running in ${NODE_ENV} mode on port ${port}`);
});
