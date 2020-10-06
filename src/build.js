// Dependencies
const emojiAll = require('emojibase-data/en/data.json');
const { constants, promises: fs } = require('fs');

// Variables & Constants
let meta = require('../package.json');
let outputDir = "snippets";
let snippets = {};

// Main
(async() => {
  console.log(`\n${meta.name} v${meta.version}\n`);

  try {
    await fs.access(outputDir, constants.D_OK);
  } catch (e) {
    await fs.mkdir(outputDir);
  }

  writeSnippets("css", ".source.css, .source.sass", "content: '\\\\", "';");
  writeSnippets("html", ".text.html, .source.html.twig, .source.svelte", "&#x", ";");
  writeSnippets("javascript", ".source.coffee, .source.js, .source.json, .source.livescript, .source.ts", "\\\\u{", "}");
  writeSnippets("python", ".source.python", "\\\\U", "");
  writeSnippets("ruby", ".source.ruby", "\\\\u{", "}");
  writeSnippets("markdown", ".source.gfm", "&#x", ";");
})();

// Functions
async function writeSnippets(type, scope, prefix = '', suffix = '') {
    for (let i = 0; i < emojiAll.length; i++) {
        let unicode;

        const name = emojiAll[i].annotation.toLowerCase().replace(/[\s,\.]+/g, "-");

        unicodes = emojiAll[i].hexcode.split("-");

        unicodes.map(function(unicode, index) {
          if (type === 'python') {
            unicode = String("0000000" + unicode).slice(-8);
          }
          unicodes[index] = `${prefix}${unicode}${suffix}`;
        });

        unicode = unicodes.join('');
        const emoji = emojiAll[i].emoji;

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

    let output = JSON.stringify(json, null, 2);

    // Save file
    let status;

    try {
      await fs.writeFile(`${outputDir}/emoji-${type}.json`, output);
      status = '\u2705';
    } catch (error) {
      status = '\u274C';
    }

    console.log(`${status}  emoji-${type}.json`);
}
