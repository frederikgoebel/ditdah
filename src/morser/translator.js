let letterToCode = {}
let codeToLetter = {}
let letterToToken = {}
let tokenToLetter = {}

import codeFile from '../assets/code.csv'
import Tokens from '../morser/Tokens.js'

import codeJson from '../assets/code.json'

function loadData(path) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path);
  xhr.onload = function() {
    if (xhr.status === 200) {
      processData(xhr.responseText)
    //loadLetterToToken()
    } // TODO error handling
  };
  xhr.send();
}

function processData(data) {
  var allTextLines = data.split(/\r\n|\n/);

  for (var i = 0; i < allTextLines.length; i++) {
    var line = allTextLines[i].split(',');
    letterToCode[line[0]] = line[1]
    codeToLetter[line[1]] = line[0]
  }
}

// Accepts text as string or as array
function encode(text) {
  if (typeof text === "string")
    text = text.split('')
  var code = []
  text.forEach(function(element) {
    var translation = codeJson[element.toUpperCase()]
    if (translation) {
      code += translation
      code += Tokens.SPACE
    }
  })
  return code
}

// Accepts:
// A single token as a string. Unknown tokens are translated to undefiend
// eg: "−·−·" => "C" or "−−−−−−−" => undefined.
// An array with tokens. Unknown tokens are translated to spaces.
// eg: ["−·−·", "−−·−", "   ", "−·−−−−·", "−−·−"] => ["C", "Q", " ", " ", "Q"]
function decode(code) {
  if (typeof code === "string")
    return codeToLetter[code]
  var text = []
  code.forEach(function(element) {
    var translation = codeToLetter[element]
    if (translation)
      text.push(translation)
    else
      text.push(" ")
  })
  return text
}

loadData(codeFile)

/*
function loadLetterToToken() {
  Object.keys(letterToCode).forEach(function(key) {
    if (letterToCode[key]) {
      letterToToken[key] = []
      letterToCode[key].split("").forEach(function(el) {
        switch (el) {
          case "·":
            letterToToken[key].push(Tokens.DIT)
            break
          case "−":
            letterToToken[key].push(Tokens.DAH)
            break
          case " ":
            letterToToken[key].push(Tokens.SPACE)
            break
          default:
            break
        }
      })
    }
  })
  console.log(letterToToken)
  saveText(JSON.stringify(letterToToken), "filename.json");
}
function saveText(text, filename) {
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}

console.log(codeJson)
*/

export { encode, decode }
