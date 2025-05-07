const chalk = require('chalk');

module.exports = {
  start: msg => console.log(chalk.magenta(`${msg}`)),
  step: msg => console.log(chalk.cyan(`${msg}`)),
  data: (msg, obj) => console.log(chalk.yellow(`${msg}`), obj),
  success: msg => console.log(chalk.green(`${msg}`)),
  error: msg => console.error(chalk.red(`${msg}`))
};
