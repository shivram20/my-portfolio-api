require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { connectdb } = require("./Models/connectdb");

const app = express();
const port = process.env.PORT || 7800;

app.use(cors());
app.use(express.json());
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/contact", contactLimiter);

//connection DB
(async () => {
  try {
    await connectdb(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
})();

// Route
const routes = require("./Routes/UserRoutes");
app.use("/api", routes);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
