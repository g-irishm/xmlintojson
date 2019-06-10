# xmlintojson
This js converts xml string into json object

# Instruction
1. Include/Require the xmlintojson.js file<br/>
```
var converter = require('./xmlintojson.js');
```

2. Pass the xml string to the function and save the json object response<br/>
```
var xml = "<parent><child></child></parent>";
var json = converter(xml);
```

# Output Format
Below is an example xml used to convert into json:<br/>
```
<?xml version="1.0"?>
<catalog>
   <book id="book001">
      <author>Anabelle</author>
      <title>The Famous Party</title>
      <genre>Action</genre>
      <price>99</price>
      <publish_date>1992-10-01</publish_date>
      <description>An interesting action story</description>
   </book>
   <book id="book002">
      <author>Jordan, Manes</author>
      <title>Midnight Train</title>
      <genre>Fantasy</genre>
      <price>98.99</price>
      <publish_date>1983-05-18</publish_date>
      <description>A zombie attack at the train in the midnight
      </description>
   </book>
</catalog>
```
<br/>Converted output: <br/>

```
{
  "xml": {
    "__version": "1.0"
  },
  "catalog": {
    "book": [
      {
        "author": {
          "_text": "Anabelle"
        },
        "title": {
          "_text": "The Famous Party"
        },
        "genre": {
          "_text": "Action"
        },
        "price": {
          "_text": "99"
        },
        "publish_date": {
          "_text": "1992-10-01"
        },
        "description": {
          "_text": "An interesting action story"
        },
        "__id": "book001"
      },
      {
        "author": {
          "_text": "Jordan, Manes"
        },
        "title": {
          "_text": "Midnight Train"
        },
        "genre": {
          "_text": "Fantasy"
        },
        "price": {
          "_text": "98.99"
        },
        "publish_date": {
          "_text": "1983-05-18"
        },
        "description": {
          "_text": "A zombie attack at the train in the midnight"
        },
        "__id": "book002"
      }
    ]
  }
}
```