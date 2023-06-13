/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
//
// This script builds a "scout.json" file that will inform how to run tests
//
// For historical reasons, arguments can be passed either with "--" _or_
// like
//
//   ./mk-configuration.js DARK=deadbee SDLC=demo
//
// Use the "--help" for more details on which parameter does what.
//
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const argv = yargs
  .env('CONFIG')
  .options({
    fileName: {
      alias: 'w',
      type: 'string',
      default: 'rubric',
      description: 'Name of the SDLC environment for which we are setting up the variables',
      choices: ['rubric', 'assess-delivery', 'assignment', 'qalv', 'demo', 'prod'],
    },
    sdlc: {
      alias: 's',
      type: 'string',
      default: 'qastg',
      description: 'Name of the SDLC environment for which we are setting up the variables',
      choices: ['dev', 'qastg', 'pqa', 'qalv', 'demo', 'prod'],
    },
    dark: {
      alias: 'd',
      type: 'boolean',
      description: 'The "${CIRCLE_SHA1:0:7}" to test against (optional)',
    },
    local: {
      alias: 'l',
      default: true,
      type: 'boolean',
      description: 'Whether to test against localhost; ignored if "dark" is set',
    },
    port: {
      alias: 'p',
      type: 'string',
      default: 4200,
      description: 'The port where localhost runs; ignored unless "local" is set',
    },
    outfile: {
      alias: 'o',
      type: 'string',
      default: path.resolve(__dirname, '..', 'res', 'scout.json'),
      description: 'the filename (including path) where the output should be written',
    },
    outfile_SDLC: {
      alias: 'e',
      type: 'string',
      default: path.resolve(__dirname, '..', 'res', 'SDLC.json'),
      description: 'the filename (including path) where the SDLC output should be written',
    },
  })
  .help().argv;
// "Nonstandard" use of command-line arguments, for historical reasons:
argv._.forEach((arg) => {
  if (arg.includes('=')) {
    const [key, ...val] = arg.split('=');
    let valString = val.join('=');
    const keyLC = key.toLowerCase();
    if (keyLC === 'port' || keyLC === 'local') {
      argv[keyLC] = JSON.parse(valString);
    } else {
      argv[keyLC] = valString;
    }
  }
});
async function main(argv) {
  // We get "everything", and make make a change if needed.
  const scout = require(path.resolve('configs', 'scout', `${argv.sdlc}.json`));
  // OK, fine; there's only one thing to change.  But maybe there will be more!
  if (argv.dark) {
    const prodnonprod = argv.sdlc === 'prod' ? 'prod' : 'nonprod';
    scout[
      'olshell_ui'
    ] = `https://${argv.dark}.ol-app-${argv.sdlc}.lms.${prodnonprod}.google.com`;
  } else if (argv.local) {
    scout['olshell_ui'] = `http://localhost:${argv.port}/secure`;
  }
  fs.writeFileSync(argv.outfile, JSON.stringify(scout, null, 2));
  //Storing arguments in SDLC.json file
  const sdlcInfo = {
    sdlc: argv.sdlc,
    dark: argv.dark,
    local: argv.local,
    // filename: argv.fileName,
  };
  fs.writeFileSync(argv.outfile_SDLC, JSON.stringify(sdlcInfo, null, 2));
}
main(argv).catch((err) => {
  console.warn(err.stack);
  process.exit(1);
});
