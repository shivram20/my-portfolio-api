if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { connectdb } = require("./Models/connectdb");
const routes = require("./Routes/UserRoutes");

const app = express();
const port = process.env.PORT || 7800;

app.use(express.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Route
// app.get("/", (req,res) =>{
//   res.status(200).send(`Hello from {My-personnal-portfolio server}`)
// })
app.use("/", routes);


app.listen(port, async () => {
  // DB Connection
  try {
    await connectdb(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (e) {
    console.error("Error during db connection");
  }
  console.log(`server started at port ${port}`);
});
