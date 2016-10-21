// Dependencies
var EmojiData = require('emoji-data-2016');
var CSON = require('cson');
var fs = require('fs');

// Variables & Constants
var meta = require('../package.json');
var outputDir = "snippets";
var emojiAll = EmojiData.all();
var snippets = {};

// Main
console.log(meta.name + " v" + meta.version + "\nThe MIT License\n");

fs.exists(outputDir, function (exists) {
  if (!exists) {
    console.log("\u1F4AB ./" + outputDir);
    fs.mkdirSync(outputDir);
  }
  writeSnippets("css", ".source.css, .source.sass", "content: '\\\\", "';");
  writeSnippets("html", ".text.html", "&#x", ";");
  writeSnippets("javascript", ".source.js", "\\\\u", "");
  writeSnippets("python", ".source.python", "u'\\\\U", "'");
  writeSnippets("ruby", ".source.ruby", "\\\\u{", "}");
});

// Functions
function writeSnippets(type, scope, prefix, suffix) {
    for (var i = 0; i < emojiAll.length; i++) {
        var emoji, name, unicode;

        if (typeof emojiAll[i].name != 'undefined' && emojiAll[i].name !== null ) {
            name = emojiAll[i].name.toLowerCase().replace(/\s/g, "-");
        } else {
            name = emojiAll[i].short_name;
        }

        unicode = emojiAll[i].unified.replace(/-/g, prefix);
        emoji = emojiAll[i].render();

        if (type === "python") {
          unicode = String("00000000" + unicode).slice(-8);
        }

        snippets[emoji] = {
            "body": prefix + unicode + suffix,
            "prefix": "ji:" + name
        };
    }

    var json = {};
    json[scope] = snippets;

    // Object to CSON
    var output = CSON.stringify(json, null, 2);

    // Save file
    fs.writeFile(outputDir + "/emoji-" + type + ".cson", output, function (err) {
      if (err) throw err;
      console.log("\u2705  emoji-" + type + ".cson");
    });
}
