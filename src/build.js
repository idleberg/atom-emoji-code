'use babel';

// Dependencies
const EmojiData = require('emoji-data-2016');
const CSON = require('cson');
const fs = require('fs');

// Variables & Constants
const meta = require('../package.json');
const outputDir = "snippets";
const emojiAll = EmojiData.all();
var snippets = {};

// Main
console.log(`${meta.name} v${meta.version}\nThe MIT License\n`);

fs.exists(outputDir, (exists) => {
  if (!exists) {
    console.log(`\u1F4AB ./${outputDir}`);
    fs.mkdirSync(outputDir);
  }
  writeSnippets("css", ".source.css, .source.sass", "content: '\\\\", "';");
  writeSnippets("html", ".text.html", "&#x", "");
  writeSnippets("javascript", ".source.js", "\\\\u", "", "");
  writeSnippets("ruby", ".source.ruby", "\\\\u{", "}");
});

// Functions
function writeSnippets(type, scope, prefix, suffix) {
    for (let i = 0; i < emojiAll.length; i++) {
        let name, unicode;

        if (typeof emojiAll[i].name != 'undefined' && emojiAll[i].name !== null ) {
            name = emojiAll[i].name.toLowerCase().replace(/\s/g, "-");
        } else {
            name = emojiAll[i].short_name;
        }

        unicode = emojiAll[i].unified.replace(/-/g, prefix);
        emoji = emojiAll[i].render();

        snippets[emoji] = {
            "body": `${prefix}${unicode}${suffix}`,
            "prefix": `ji:${name}`
        };
    }

    let json = {};
    json[scope] = snippets;

    // Object to CSON
    output = CSON.stringify(json, null, 2);

    // Save file
    fs.writeFile(`${outputDir}/emoji-${type}.cson`, output, (err) => {
      if (err) throw err;
      console.log(`\u2705 emoji-${type}.cson`);
    });
}
