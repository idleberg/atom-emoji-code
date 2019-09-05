// Dependencies
const emojiAll = require('emojibase-data/en/data.json');
const { exists, mkdirSync, writeFile } = require('fs');
const CSON = require('cson');

// Variables & Constants
let meta = require('../package.json');
let outputDir = "snippets";
let snippets = {};

// Main
console.log(`\n${meta.name} v${meta.version}\n`);

exists(outputDir, function (exists) {
  if (!exists) {
    console.log("\u1F4AB ./" + outputDir);
    mkdirSync(outputDir);
  }
  writeSnippets("css", ".source.css, .source.sass", "content: '\\\\", "';");
  writeSnippets("html", ".text.html .source.html.twig", "&#x", ";");
  writeSnippets("javascript", ".source.coffee, .source.js, .source.json, .source.livescript, .source.ts", "\\\\u{", "}");
  writeSnippets("python", ".source.python", "\\\\U", "");
  writeSnippets("ruby", ".source.ruby", "\\\\u{", "}");
});

// Functions
function writeSnippets(type, scope, prefix = '', suffix = '') {
    for (let i = 0; i < emojiAll.length; i++) {
        let emoji, name, unicode;

        if (typeof emojiAll[i].name != 'undefined' && emojiAll[i].name !== null ) {
            name = emojiAll[i].name.toLowerCase().replace(/[\s,\.]+/g, "-");
        } else {
            name = emojiAll[i].short_name;
        }

        unicodes = emojiAll[i].hexcode.split("-");

        unicodes.forEach(function(unicode, index) {
          if (type === 'python') {
            unicode = String("0000000" + unicode).slice(-8);
          }
          unicodes[index] = `${prefix}${unicode}${suffix}`;
        });

        unicode = unicodes.join('');
        emoji = emojiAll[i].emoji;

        switch (type) {
          case 'css':
            unicode = `content: '${unicode}';`;
            break;
        }

        snippets[emoji] = {
            "body": `${unicode}`,
            "prefix": `ji:${name}`
        };
    }

    let json = {};
    json[scope] = snippets;

    // Object to CSON
    let output = CSON.stringify(json, null, 2);

    // Save file
    writeFile(`${outputDir}/emoji-${type}.cson`, output, (err) => {
      let status;

      if (err) {
        status = '\u274C';
      } else {
        status = '\u2705';
      }

      console.log(`${status}  emoji-${type}.cson`);
    });
}
