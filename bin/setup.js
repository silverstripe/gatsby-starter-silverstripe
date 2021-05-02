const inquirer = require("inquirer")
const chalk = require("chalk")
const path = require("path")
const { writeFileSync } = require("fs")
const { execSync } = require("child_process")

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
    name: "module",
    message: "Do you have the silverstripe-gatsby module installed already?",
    type: "list",
    choices: [
      {
        name: "Yup! Good to go.",
        value: true,
      },
      {
        name: "Nope. What do I do?",
        value: false,
      },
    ],
  },
  {
    name: `baseUrl`,
    message: `What is the ${chalk.green(
      "base URL"
    )} of your Silverstripe CMS website?
        (e.g. https://mywebsite.com) Local URLs are OK!
        
URL:    `,
    when: answers => {
      if (!answers.module) {
        console.log(
          chalk.yellow(`
                Please go to:

                https://github.com/silverstripe/silverstripe-gatsby

                For instructions on installing this module and rerun this installation script when finished.`)
        )
        process.exit(1)
      }

      return true
    },
    validate: input => {
      let url
      try {
        url = new URL(input)
      } catch (_) {
        return false
      }

      return url.protocol !== "http:" && url.protocol !== "https:"
        ? `That doesn't appear to be a valid URL`
        : true
    },
  },
  {
    name: `apiKey`,
    message: answers => `What is the ${chalk.green(
      "API key"
    )} of your admin user?
        Your API key can be found at:
        ${chalk.green(`${answers.baseUrl}/admin/security`)} ${chalk.red(
      "->"
    )} <your user> ${chalk.red("->")} ${chalk.green("Api keys")}
        
API Key: `,
    validate: input =>
      input.length === 48 ||
      `That does not appear to be a valid API key. It should be a 48 character string.`,
  },
  {
    name: `doHeroku`,
    message: `Do you want to set up a preview site with Heroku?`,
    type: `confirm`,
  },
  {
    name: `herokuName`,
    message: `What is the name of the heroku site you want to set up?
      
Name: 
      `,
    default: path.basename(path.resolve(__dirname, `../`)),
    when: ({ doHeroku }) => {
      if (!doHeroku) {
        return false
      }
      if (!hasHeroku) {
        chalk.yellow(`
          Looks like you do not have the Heroku CLI tools installed on your system. Please visit:

          https://devcenter.heroku.com/articles/heroku-cli#download-and-install

          For instructions on installing these tools and come back and run this installation script.
          `)
        process.exit(1)
      }
      return true
    },

    validate: input => {
      return !!input.match(/[A-Za-z0-9_-]/)
    },
  },
]

let hasHeroku = true
execSync(`heroku --version`, err => (hasHeroku = false))

inquirer
  .prompt(questions)
  .then(({ baseUrl, apiKey, doHeroku, herokuName }) => {
    console.log("Writing env file...")
    const configFilePath = path.resolve(__dirname, "..", ".env")
    writeFileSync(
      configFilePath,
      `SILVERSTRIPE_CMS_BASE_URL = '${baseUrl}'
SILVERSTRIPE_CMS_API_KEY = '${apiKey}'
SILVERSTRIPE_STAGE='DRAFT'`
    )
    console.log(`Environment file ${chalk.yellow(configFilePath)} written`)

    if (doHeroku) {
      const configFilePath = path.resolve(__dirname, "..", "Procfile")
      writeFileSync(configFilePath, `web: gatsby develop -p $PORT -H 0.0.0.0`)

      execSync(`heroku create ${herokuName}`, err => {
        if (err) {
          console.error(
            chalk.red(
              `There was an error creating your Heroku preview server: ${err}`
            )
          )
          process.exit(1)
        }
      })
      console.log(`Heroku site created. Configuring git...`)

      execSync(`heroku git:remote -a ${herokuName}`, err => {
        if (err) {
          console.error(
            chalk.red(`There was an error adding a Heroku git remote: ${err}`)
          )
          process.exit(1)
        }
      })

      console.log(`Heroku git remote added. Configuring env vars...`)

      const pairs = [
        { name: `ENABLE_GATSBY_REFRESH_ENDPOINT`, value: `true` },
        { name: `GATSBY_EXPERIMENTAL_DISABLE_SCHEMA_REBUILD`, value: `true` },
        { name: `NODE_ENV`, value: `development` },
        { name: `SILVERSTRIPE_API_KEY`, value: apiKey },
        { name: `SILVERSTRIPE_CMS_BASE_URL`, value: baseUrl },
      ]
      for (pair of pairs) {
        const { name, value } = pair
        execSync(`heroku config:set ${name}=${value}`, err => {
          if (err) {
            console.error(
              chalk.red(
                `There was an error setting environment variable ${name}: ${err}`
              )
            )
            process.exit(1)
          }
        })
      }

      console.log(
        chalk.green(`
To deploy to heroku, use:
        `),
        chalk.yellow(`
        
  git push heroku master
        
        `)
      )
    }
    console.log(
      chalk.green(
        `All set! You can now run:
        
        `
      ),
      chalk.yellow(
        `yarn develop
          `
      ),
      chalk.green(`
to see your Gatsby website in action.
      `)
    )
  })
  .catch(error => console.error(error))
