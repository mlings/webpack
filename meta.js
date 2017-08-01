module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "project": {
      "type": "string",
      "message": "Project folder name",
      "default": "project"
    },
    "build": {
      "type": "list",
      "message": "Vue build",
      "choices": [
        {
          "name": "Runtime + Compiler: recommended for most users",
          "value": "standalone",
          "short": "standalone"
        },
        {
          "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
          "value": "runtime",
          "short": "runtime"
        }
      ]
    },
    "router": {
      "type": "confirm",
      "message": "Install vue-router?"
    },
    "babel": {
      "type": "list",
      "message": "Babel Mode",
      "choices": [
        {
          "name": "babel polypill",
          "value": "polypill",
          "short": "polypill"
        },
        {
          "name": "babel plugin transform runtime",
          "value": "runtime",
          "short": "runtime"
        }
      ]
    },
    "lint": {
      "type": "confirm",
      "message": "Use ESLint to lint your code?"
    },
    "lintConfig": {
      "when": "lint",
      "type": "list",
      "message": "Pick an ESLint preset",
      "choices": [
        {
          "name": "Standard (https://github.com/feross/standard)",
          "value": "standard",
          "short": "Standard"
        },
        {
          "name": "Airbnb (https://github.com/airbnb/javascript)",
          "value": "airbnb",
          "short": "Airbnb"
        },
        {
          "name": "none (configure it yourself)",
          "value": "none",
          "short": "none"
        }
      ]
    },
    "unit": {
      "type": "confirm",
      "message": "Setup unit tests with Karma + Mocha?"
    },
    "e2e": {
      "type": "confirm",
      "message": "Setup e2e tests with Nightwatch?"
    }
  },
  "filters": {
    ".eslintrc.js": "lint",
    ".eslintignore": "lint",
    "*/config/test.env.js": "unit || e2e",
    "*/test/unit/**/*": "unit",
    "*/build/webpack.test.conf.js": "unit",
    "*/test/e2e/**/*": "e2e",
    "*/src/router/**/*": "router"
  },
  complete (data) {
    let path = require('path'), 
      fs = require('fs'),
      pre = data.inPlace ? '' : data.destDirName + '/',
      dir = path.resolve(pre + 'project')
    fs.rename(dir, dir.replace(/project$/g, data.project), function(err){})
    let completeMessage = "\n  To get started:\n\n" + (!data.inPlace ? "  cd " + data.destDirName + "\n" : "") + "  npm install\n  npm install --registry=https://registry.npm.taobao.org\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
    console.log(completeMessage)
  }
};
