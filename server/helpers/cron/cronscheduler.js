"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const node_cron_1 = __importDefault(require("node-cron"));
const jobs_1 = require("./jobs");
class CronSchedule {
    static startJob() {
        const cronOptions = {
            scheduled: true,
            timezone: "Europe/London",
        };
        node_cron_1.default.schedule("0 0 */3 * * *", jobs_1.TransactionJobs.run, cronOptions);
        console.log(chalk_1.default.green.bold(`CRON JOB CONNECTED`));
    }
}
exports.default = CronSchedule;
