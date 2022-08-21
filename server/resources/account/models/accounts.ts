import { Schema, model } from 'mongoose';
import shortid from 'shortid';

import { IAccount } from 'types/defined-interfaces';

const accountSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  meta: {
    "data_status": {
      type: String
    },
    "auth_method": {
      type: String
    }
  },
  account: {
    _id: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    currency: {
      type: String,
      enum: ['NGN', 'GHS', 'KES', 'ZAR'],
      default: 'NGN'
    },
    type: {
      type: String
    },
    accountNumber: {
      type: String
    },
    balance: {
      type: String
    },
    institution: {
      name: {
        type: String
      },
      bankCode: {
        type: String
      },
      type: {
        type: String
      }
    },
    bvn: {
      type: String
    }
  },
});

export default model<IAccount>('Account', accountSchema);
