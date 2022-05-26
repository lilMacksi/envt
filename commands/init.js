'use strict';

import chalk from 'chalk';
import fs from "fs"
import crypto from "crypto"
import Conf from 'conf'
import constants from '../lib/constants.js'

const conf = new Conf({
    projectName: 'envt'
});

const encrypt = (buffer, key) => {
    // Create an initialization vector
    const iv = crypto.randomBytes(16);
    // Create a new cipher using the algorithm, key, and iv
    const cipher = crypto.createCipheriv(constants.ALGORITHM, key, iv);
    // Create the new (encrypted) buffer
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
};

export default ({ key }) => {
    if (!fs.existsSync(constants.ENVT_CONFIG_FILENAME)) {
        console.log(chalk.bold.red("Config file not found!"))
        return;
    }

    const config = JSON.parse(fs.readFileSync(constants.ENVT_CONFIG_FILENAME));
    if (!config.env) {
        console.log(chalk.bold.red("env property not set in config"))
        return;
    }

    const privateKey = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
    conf.set('privateKey', privateKey);

    if (!fs.existsSync(config.env)) {
        console.log(chalk.bold.red("Env file not found!"))
        return;
    }
    const environment = fs.readFileSync(config.env)
    const buffer = Buffer.from(environment);
    
    const encrypted = encrypt(buffer, privateKey);
    fs.writeFileSync(constants.DEFAULT_ENVT_FILENAME, encrypted);

    console.log(chalk.greenBright.bold("Successfully encrypted file"))
}