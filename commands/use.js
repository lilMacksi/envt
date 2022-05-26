'use strict';

import chalk from 'chalk';
import crypto from "crypto"
import Conf from 'conf'
import fs from "fs"
import constants from '../lib/constants.js'

const conf = new Conf({
    projectName: 'envt'
});
const algorithm = constants.ALGORITHM;

const decrypt = (encrypted, key) => {
    // Get the iv: the first 16 bytes
    const iv = encrypted.slice(0, 16);
    // Get the rest
    encrypted = encrypted.slice(16);
    // Create a decipher
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // Actually decrypt it
    const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return result;
};

export default () => {
    
    if (!fs.existsSync(constants.DEFAULT_ENVT_FILENAME)) {
        console.log(chalk.bold.red("Envt file not found!"))
        return;
    }

    const encrypted = fs.readFileSync(constants.DEFAULT_ENVT_FILENAME)

    const privateKey = conf.get('privateKey');
    if (!privateKey) {
        console.log(chalk.bold.red("Private key not found!"))
        return;
    }
    const buffer = Buffer.from(encrypted);

    if (!buffer) {
        console.log(chalk.bold.red("Buffer not stored!"))
        return;
    }

    /* TODO: Inject env variables
    const decryptedBuffer = decrypt(buffer, privateKey);
    const decrypted = decryptedBuffer.toString(); 
    */

    console.log(chalk.greenBright.bold("Successfully decrypted file!"))
}