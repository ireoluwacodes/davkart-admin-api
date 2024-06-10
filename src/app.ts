import { app, ConnectDb, PORT } from "./config";

const startApp = async () => {
  await ConnectDb();
  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
};

startApp();
