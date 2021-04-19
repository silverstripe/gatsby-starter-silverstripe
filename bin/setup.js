const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { writeFileSync } = require('fs')

// ${chalk.yellow(
//     `yourwebsite.com/admin ${chalk.red('->')}  ${chalk.red(
//       '->'
//     )} API keys`
//   )}

//   The ${chalk.green('Content Delivery API Token')}
//     will be used to ship published production-ready content in your Gatsby app.

//   The ${chalk.green('Content Preview API Token')}
//     will be used to show not published data in your development environment.

//   The ${chalk.green('Content Management API Token')}
//     will be used to import and write data to your space.

console.log(`
  This tool helps you get your Gatsby project connected to a Silverstripe CMS 
  data source. You'll need to provide the URL to your Silverstripe installation
  and add your API key.

  Make sure the silverstripe-gatsby module (https://github.com/silverstripe/silverstripe-gatsby)
  has been installed on your Silverstripe backend before starting.
  
  Ready? Let's do it! 🎉
`)

const questions = [
    {
        name: 'module',
        messsage: 'Do you have the silverstripe-gatsby module installed already?',
        choices: [ 'Yup, done.', 'No. What do I do?'],
        validate: input => {
            if (input.match(/^No/)) {
                console.log(`Please install the module as shown above and rerun this script when you're done.`);
                process.exit(0);
            }
            return true;
        }
    },
    {
        name: `baseUrl`,
        message: `What is the ${chalk.green('base URL')} of your Silverstripe CMS website?
        (e.g. https://mywebsite.com) Local URLs are OK!`,
        validate: input => {
            let url;
            try {
              url = new URL(input);
            } catch (_) {
              return false;  
            }
          
            return url.protocol !== "http:" && url.protocol !== "https:"
                ? `That doesn't appear to be a valid URL`
                : true
        }
    },
    {
        name: `apiKey`,
        message: answers => `What is the ${chalk.green('API key')} of your admin user?
        Your API key can be found at:
        ${chalk.green(`${answers.baseURL}/admin/security`)} ${chalk.red('->')} <your user> ${chalk.red('->')} ${chalk.green('Api keys')}`,
        validate: input => input.length === 48 || `That does not appear to be a valid API key. It should be a 48 character string.`
    },
]

inquirer
  .prompt(questions)
  .then(({ baseUrl, apiKey }) => {
    console.log('Writing env file...')
    const configFilePath = path.resolve(__dirname, '..', '.env')
    writeFileSync(
      configFilePath,
      `
SILVERSTRIPE_CMS_BASE_URL = '${baseUrl}'
SILVERSTRIPE_CMS_API_KEY = '${apiKey}'
SILVERSTRIPE_STAGE='DRAFT'
      `
    )
    console.log(`Environment file ${chalk.yellow(configFilePath)} written`)
    console.log(
        `All set! You can now run ${chalk.yellow(
          'yarn develop'
        )} to see it in action.`
      )
  })
  .catch(error => console.error(error))
