import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';

export interface IUser extends Document {
  hashedPassword: any;
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  accountsCount: number;
  isActive: boolean
}

export interface IAccount extends Document {
  _id: string;
  user: string;
  meta: {
    "data_status": string;
    "auth_method": string;
  },
  account: {
    _id: string;
    name: string;
    currency: string;
    type: string;
    accountNumber: string;
    balance: string;
    institution: {
      name: string;
      bankCode: string;
      type: string;
    },
    bvn: string;
  },
}

export interface ITransaction extends Document {
  _id: string;
  type: string;
  amount: number
  narration: string;
  date: string;
  balance: number;
  account: string;
  category: string;
}

export interface IRequest extends Request {
  user?: string | JwtPayload;
}

export enum STATUS {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO'
}
