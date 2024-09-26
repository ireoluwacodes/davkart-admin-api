import { connect, connection } from 'mongoose';
import { localMUrl, nodeEnv, webMUrl } from './constants.config';

const selectDb = () => {
  if (nodeEnv == 'production') {
    return webMUrl;
  } else {
    return localMUrl;
  }
};

export const ConnectDb = async () => {
  try {
    await connect(selectDb());

    console.log(`MongoDB Connection Succeeded at ${connection.host}`);
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};
