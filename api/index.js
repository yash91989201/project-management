require("dotenv").config();
const cors = require("cors");
const colors = require("colors");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema/schema.js");
const connectDB = require("./db/conn.js");
connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

// graphql middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, (err) => {
  console.log(err || `Server running on PORT:${PORT}`);
});
