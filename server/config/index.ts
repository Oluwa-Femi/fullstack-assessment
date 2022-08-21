import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const config = {
  port,
  secret: process.env.SECRET || '',
  database: {
    url: process.env.MONGO_URL || '',
  },
  mono: {
    publicKey: process.env.MONO_PUBLIC_KEY || '',
    secretKey: process.env.MONO_SECRET_KEY || '',
  },
};

export default config;
