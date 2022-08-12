import mongoose from 'mongoose';
import options from '../config';
import chalk from 'chalk';

export const connect = async (url = options.dbUrl) => {
  try {
    return await mongoose.connect(
      url,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      () => {
        console.log(chalk.blue.bold('DB connected!.'));
      }
    );
  } catch (err) {
    mongoose.connection.on('error', (err) => {
      console.log(chalk.red(`DB connection error: ${err.message}`));
    });
  }
};