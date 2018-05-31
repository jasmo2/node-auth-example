const createApp = require("./app");
const port = process.env.PORT || 3000;

const run = async () => {
  const app = await createApp();
  app.listen(port, () => console.log("Listening on port " + port + "..."));
}

run().catch((err) => console.log(err.stack));
