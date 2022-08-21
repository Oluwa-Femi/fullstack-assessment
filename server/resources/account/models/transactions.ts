import { Schema, model } from 'mongoose';
import shortid from 'shortid';

import { ITransaction } from 'types/defined-interfaces';

const transactionSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  type: {
    type: String,
    enum: ['credit', 'debit']
  },
  amount: {
    type: Number,
  },
  narration: {
    type: String
  },
  date: {
    type: Date
  },
  balance: {
    type: Number
  },
  account: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

export default model<ITransaction>('Transaction', transactionSchema);
