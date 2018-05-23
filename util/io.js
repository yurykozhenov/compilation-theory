const readline = require('readline');

exports.input = async message =>
  new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(message, answer => {
      resolve(answer);
      rl.close();
    });
  });
