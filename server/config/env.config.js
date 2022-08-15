import { config } from 'dotenv';

const { env } = process;

const config = {
  port: env.PORT,
};

export default config;
