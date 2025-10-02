const express = require("express");
const expressProxy = require("express-http-proxy");

const app = express();

app.use("/api/users", expressProxy("http://localhost:3001"));

app.listen(3000, () => {
  console.log("API Gateway is running on port 3000");
});
