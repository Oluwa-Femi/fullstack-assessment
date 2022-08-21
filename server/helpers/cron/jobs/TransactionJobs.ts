// import { Account, Transactions } from '../../models';
class TransactionJobs {
  static async run() {
    try {
      console.log('cron job');

    } catch (error) {
      console.log(error);
    }
  }
}

export default TransactionJobs;
