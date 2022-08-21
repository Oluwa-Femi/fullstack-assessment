import { Schema, model } from 'mongoose';
import shortid from 'shortid';
import bcrypt from 'bcrypt';

import { IUser } from 'types/defined-interfaces';

const userSchema: Schema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  accountsCount: {
    type: Number,
    default: 0
  },
  hashedPassword: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

userSchema.virtual('password').get(function (this: any) {
  return this.hashedPassword;
});

userSchema.virtual('password').set(function (this: any, plainText: string | Buffer) {
  const salt = bcrypt.genSaltSync(10);
  this.hashedPassword = bcrypt.hashSync(plainText, salt);
});

export default model<IUser>('User', userSchema);
