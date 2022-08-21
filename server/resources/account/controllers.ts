import { Response, NextFunction } from 'express';
import Account from './models/accounts';
import Transaction from './models/transactions';
import User from '../auth/model';
import { RequestHelpers, TransactionHelpers } from '../../helpers';
import { ErrorHandler } from '../../helpers/ErrorHelpers';
import { IRequest, IUser, ITransaction } from 'types/defined-interfaces';

class AccountControllers {
  static async connect(req: IRequest, res: Response, next: NextFunction) {
    const { code } = req.body;
    const userObj = req.user as IUser;

    const user = await User.findById(userObj.id);

    if (!user) {
      return next(new ErrorHandler('Sorry, this user does not exist', 404));
    }

    try {
      // verify code and get accountId
      const response1 = await RequestHelpers.request({
        url: 'https://api.withmono.com/account/auth',
        method: 'POST',
        data: { code },
      });
      // get account information using accountId
      const response2 = await RequestHelpers.request({
        url: `https://api.withmono.com/accounts/${response1.data.id}`,
        method: 'GET',
      });
      // get all transactions for above account
      //TODO: Remove limit query
      const response3 = await RequestHelpers.request({
        url: `https://api.withmono.com/accounts/${response1.data.id}/transactions?paginate=false`,
        method: 'GET',
      });

      const { meta, account } = response2.data;
      const { data } = response3.data;

      const acct = new Account({ meta, account, user: user._id });
      // modify transaction data to include accountID and category
      const txns = data.map((txn: ITransaction) => ({
        ...txn,
        account: response1.data.id,
        category: TransactionHelpers.generateCategory(),
      }));

      // increment count for users accounts
      user.accountsCount += 1;

      // save account and transactions to database
      await Transaction.insertMany(txns);

      await user.save();
      await acct.save();

      res.status(200).json({
        response: 'Success',
        data: {
          message: 'Account successfully linked',
          account: acct,
          transactions: txns.slice(0, 5),
        },
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const message = error.response?.data?.message || 'Oops looks like something went wrong, please try again later';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const status = error.response?.status || 500;
      return next(new ErrorHandler(message, status));
    }
  }

  static async disconnect(req: IRequest, res: Response, next: NextFunction) {
    const { accountId } = req.params;
    const userObj = req.user as IUser;

    const user = await User.findById(userObj.id);

    const account = await Account.findOneAndDelete({
      user: userObj.id,
      'account._id': accountId,
    });

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    if (!account) {
      return next(
        new ErrorHandler(
          `Sorry, you have no account with the id: ${accountId}`,
          404
        )
      );
    }

    try {
      await RequestHelpers.request({
        url: `https://api.withmono.com/accounts/${accountId}/unlink`,
        method: 'POST',
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const message = error.response?.data?.message || 'Oops looks like something went wrong, please try again later';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const status = error.response?.status || 500;
      return next(new ErrorHandler(message, status));
    }

    // update account count information for user model
    user.accountsCount = user.accountsCount - 1;


    // fetch updated accounts 
    const accounts = await Account.find({ user: userObj.id });

    await user.save();

    res.status(200).json({
      response: 'Success',
      data: {
        message: 'Account has been successfully deleted',
        accounts: accounts
      },
    });
  }

  static async retrieveAccts(req: IRequest, res: Response) {
    const { offset = 0, limit = 10 } = req.query;
    const skip = +offset as unknown as number;
    const take = +limit as unknown as number;

    const userObj = req.user as IUser;

    const accounts = await Account.find({ user: userObj.id })
      .skip(skip)
      .limit(take);
    const accountsCount = await Account.count({ user: userObj.id });

    res.status(200).json({
      response: 'Success',
      maxPage: accountsCount <= 10 ? 1 : Math.round(accountsCount / take),
      currentPage: skip / take + 1,
      accounts: accounts,
    });
  }

  static async retrieveTxns(req: IRequest, res: Response) {
    const { offset = 0, limit = 10 } = req.query;
    const skip = +offset as unknown as number;
    const take = +limit as unknown as number;
    const { accountId } = req.params;

    const transactions = await Transaction.find({ account: accountId })
      .skip(skip)
      .limit(take);
    const transactionsCount = await Transaction.count({ account: accountId });

    res.status(200).json({
      response: 'Success',
      maxPage: transactionsCount <= 10 ? 1 : Math.round(transactionsCount / take),
      currentPage: skip / take + 1,
      transactions: transactions,
    });
  }
}

export default AccountControllers;
