import { program } from 'commander';
import test from "./commands/test.js"
import init from "./commands/init.js"
import use from "./commands/use.js"

program
    .command('test')
    .description('Test command')
    .action(test);

program
    .command('init')
    .description('Init file from config')
    .requiredOption('-k, --key <string>', 'The private key used to enrypt the file.')
    .action(init);

program
    .command('use')
    .description('Use envt config')
    .action(use);

program.parse();

program.opts();
