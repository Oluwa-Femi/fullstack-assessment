require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  port: process.env.PORT,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: process.env.JWT_EXP
  }
};

export default baseConfig;
