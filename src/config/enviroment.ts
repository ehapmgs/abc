import {config} from 'dotenv';

config({ path: '.env' });


const environmentVariables = (key:string):string => {
    if (typeof process.env[key] === 'string') {
        return process.env[key] as string
    }
    throw new Error(`Missing environment variable ${key}`)
}

export const ENVIRONMENT_VARIABLES = {
    PRIVET_KEY: environmentVariables('PRIVET_KEY')
}
