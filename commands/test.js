'use strict';

import chalk from 'chalk';
import sha512 from 'crypto-js/sha512.js';
import AES from 'crypto-js/aes.js';
import fs from "fs"

export default () => {
    console.log(chalk.bold.green("Working!"))
}