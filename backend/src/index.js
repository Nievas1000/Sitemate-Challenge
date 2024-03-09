const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const issuesRouter = require("./routes/issues");

app.use("/api/issues", issuesRouter);

app.listen(3000, () => {
  console.log(`Listening on port`, 3000);
});
