import chalk from "chalk";
import nodeCron, { ScheduleOptions } from "node-cron";
import { TransactionJobs } from "./jobs";

class CronSchedule {
  static startJob() {
    const cronOptions: ScheduleOptions = {
      scheduled: true,
      timezone: "Europe/London",
    };
    nodeCron.schedule("0 0 */3 * * *", TransactionJobs.run, cronOptions);

    console.log(
      chalk.green.bold(`CRON JOB CONNECTED`)
    );
  }
}

export default CronSchedule;
