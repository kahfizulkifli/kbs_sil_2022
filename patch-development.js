const { readFileSync, writeFileSync } = require('fs')

const K_FILE_LOCATION = './src/config/Constants.js'

const K_LINE_WITH_TEXT = 'const isStaging ='
const K_CHANGE_TO = 'const isStaging = false'

const contents = readFileSync(K_FILE_LOCATION, 'utf8')

const arrContents = contents.split('\n')
arrContents.forEach((content, i) => {
  if (content.includes(K_LINE_WITH_TEXT)) {
    // console.log(content)
    arrContents[i] = K_CHANGE_TO
    // console.log("changed to: " + arrContents[i])
  }
})

const newContents = arrContents.join('\n')

writeFileSync(K_FILE_LOCATION, newContents)
