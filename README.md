# parsick
[![Build Status](https://travis-ci.org/thebergamo/parsick.svg)](https://travis-ci.org/thebergamo/parsick) [![Coverage Status](https://coveralls.io/repos/thebergamo/parsick/badge.svg?branch=master)](https://coveralls.io/r/thebergamo/parsick?branch=master)

Parse any data sick and select only the healthy fields

## What's is Parsick?

Parsick is an easy way to parse any data and select only a set of fields of data.   
Some data have a lot of useless data for you (sick (: ) and sometimes is painful and parse it for a useful data (healthy) for your purpose.

## Usage

**NOTE**: If your data have nested fields, they will to the root. To see more complex examples, see the test.

```javascript
'use strict';

var Parsick = require('parsick');

var parsick = new Parsick();

// Parse sick JSON
let jsonSample = {mark: 1, marquee: 2};

// Get healthy data
let result = parsick.parse('json', jsonSample, 'mark');
// result: [ { mark: 1 } ]

// Parse sick XML
let xmlSample = '<root><mark>1</mark><marquee>2</marquee></root>';

// Get healthy data
result = parsick.parse('xml', xmlSample, 'mark')
// result: [ { mark: 1 } ]

```

**NOTE**: At this time just XML and JSON can be parsed. But you can simply create yours own adapters for parse your format (see below).

## Public Methods

## Constructor(adapters)

By default we load all adapters in `adapters` directory. If specified just adapters is used.

  - **adapters** : This argument must be an `Object` with keys is adapters' name and value a `function` with the logic to parse data. See more example in `adapters` directory.

  **example**
  ```javascript
    let adapters = {
      json: (source, fields) => { return fields; } // dummy example
    }
  ``` 

### parse(type, sourceData, fields)

Parse the `sourceData` and return only the specified `fields`.

  - **type** : The type of data in `sourceData` currently is supported only: JSON and XML.
  - **sourceData** : Sick data to be parsed.
  - **fields** : Wanted fields for the new healthy data.  



### Contribute

To contribute you can try to find an [issue or enchancment][0] and try to
implement it. Fork the project, implement the code, make tests, add yourself
to the [contributors][1] list and send the PR to the master branch.

### Testing

For testing you just need run `npm install` after `npm test` inside root folder of this project. All depencies is installed in `npm install`; 

### License

Copyright (c) 2015, Marcos Bérgamo <marcos@thedon.com.br>

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

[0]: https://github.com/thebergamo/parsick/issues?q=is%3Aopen+is%3Aenchancement+is%3Abug
[1]: contributors.md
