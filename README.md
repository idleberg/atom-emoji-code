# emoji-code

[![apm](https://img.shields.io/apm/l/emoji-code.svg?style=flat-square)](https://atom.io/packages/emoji-code)
[![apm](https://img.shields.io/apm/v/emoji-code.svg?style=flat-square)](https://atom.io/packages/emoji-code)
[![apm](https://img.shields.io/apm/dm/emoji-code.svg?style=flat-square)](https://atom.io/packages/emoji-code)
[![Travis](https://img.shields.io/travis/idleberg/atom-emoji-code.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-emoji-code)
[![David](https://img.shields.io/david/dev/idleberg/atom-emoji-code.svg?style=flat-square)](https://david-dm.org/idleberg/atom-emoji-code#info=devDependencies)

Atom snippets to insert escaped Emoji code into HTML, CSS, JavaScript and Ruby.

![Screenshot](https://raw.github.com/idleberg/atom-emoji-code/master/screenshot.gif)

*Screenshot of completions in Atom with [one-light-ui](https://github.com/atom/one-light-ui)*

## Usage

All emojis are prefixed with `ji`, following the string of the official [Unicode terminology](unicode.org/emoji/charts/full-emoji-list.html).

**Examples:**

Let's say, you want to insert the 😄 emoji

* HTML: `ji:grinning-face` becomes `&#x1F600;`
* CSS: `ji:grinning-face` becomes `content: '\1F600';`
* JavaScript: `ji:grinning-face` becomes `u\1F600`

Keep in mind that Atom supports fuzzy completion, inviting you to use abbreviation of your preference.

## Installation

### apm

* Install package `apm install emoji-code` (or use the GUI)

### GitHub

1. Change directory `cd ~/.atom/packages/`
2. Clone repository `git clone https://github.com/idleberg/atom-emoji-code emoji-code`
## License

## Cheatsheet

 Take note of this list of [all supported emoji codes](cheatsheet.md).

## License

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-emoji-code) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`