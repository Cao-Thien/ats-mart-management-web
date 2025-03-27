/* eslint no-console: 0 */
/* eslint @typescript-eslint/no-var-requires: 0 */

const fs = require('fs');
const { trim } = require('lodash');

const envFilesToJson = fileNames => {
  const envObj = {};

  (Array.isArray(fileNames) ? fileNames : [fileNames]).forEach(fileName => {
    const envContent = fs.readFileSync(fileName, 'utf8');

    envContent.split('\n').forEach(line => {
      if (line.length > 0 && !line.startsWith('#') && line.includes('=')) {
        const [key, valueStr] = line.split('=');

        if (envObj[key] == null) {
          const [value] = valueStr.split('#');
          envObj[key] = trim(value.trim(), '"');
        }
      }
    });
  });

  return envObj;
};

const commonEnv = envFilesToJson(['./.env.build', './.env']);
const productionEnv = envFilesToJson('./.env.production');
const demoEnv = envFilesToJson('./.env.demo');

const tsApp = {
  name:
    'aw' +
    (process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.includes(':')
      ? ':' + process.env.npm_lifecycle_event.split(':')[1]
      : ''),
  script: './dist/server.js',
  env_production: Object.assign({}, commonEnv, productionEnv),
  env_demo: Object.assign({}, commonEnv, demoEnv),
};

// console.debug('hello', tsApp);

module.exports = {
  apps: [tsApp],
};
