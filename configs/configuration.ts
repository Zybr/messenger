import {readFileSync} from 'fs';
import * as yaml from 'js-yaml';
import {join} from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const database = require("../../configs/database.json")

const CONFIG_DIR = '../../configs/';

export default (): Record<string, never> => {
    return {
        ...yaml.load(readFileSync(join(__dirname, CONFIG_DIR, 'config.yml'), 'utf8')),
        ...{database}
    };
};
