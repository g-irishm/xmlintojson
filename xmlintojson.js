// the main function
function execute(xml) {
    // recursion breaker
    if (xml.indexOf("<") < 0 || xml == '' || xml == " ") {
        if (xml.indexOf("&lt;![CDATA[") != -1) {
            while (xml.indexOf("&lt;![CDATA[") != -1) {
                xml = xml.replace("&lt;![CDATA[", '').replace("]]&gt;", '');
            }
            return {
                _cdata: xml
            };
        } else {
            return xml;
        }
    }

    // self explanatory tags
    var JSON = {};
    var sameLevelTags = findSameLevelTags(xml);
    var previousTag = null;
    var position = 0;

    for (const tag of sameLevelTags) {
        if (previousTag != tag) {
            previousTag = tag;
            JSON[tag] = {};
        } else {
            JSON[tag] = [];
        }
    }

    previousTag = null;

    for (const tag of sameLevelTags) {
        const FINISH_TAG = "</" + tag + ">";
        const IS_SELF_CLOSING_TAG = isSelfClosingTag(xml, tag);
        var nextStartPoint = true;

        if (tag != previousTag) {
            position = 0;
        }

        var attributes = findAttributes(xml, tag);

        if (tag != previousTag && !(JSON[tag] instanceof Array)) {
            if (!IS_SELF_CLOSING_TAG) {
                var substring = indentifySubstring(xml, "<" + tag, FINISH_TAG);
                JSON[tag] = execute(substring);
            } else {
                JSON[tag] = {};
                nextStartPoint = false;
            }

            for (key in attributes) {
                JSON[tag]["__" + key] = attributes[key];
            }
        } else {
            if (!IS_SELF_CLOSING_TAG) {
                var substring = indentifySubstring(xml, "<" + tag, FINISH_TAG);
                JSON[tag][position] = execute(substring);
            } else {
                JSON[tag][position] = {};
            }

            for (key in attributes) {
                JSON[tag][position]["__" + key] = attributes[key];
            }
        }

        position++;

        if (nextStartPoint == true) {
            nextStartPoint = xml.indexOf(FINISH_TAG) + FINISH_TAG.length;
            xml = xml.substring(nextStartPoint, xml.length);
        }

        previousTag = tag;
    }

    return JSON;
}

// finds the tags in the same level of current position of xml reading process
function findSameLevelTags(xml) {
    var sameLevelTags = [];
    var counter = 0;
    var nextString = xml;

    while (nextString.indexOf("<") != -1 && nextString != "" && nextString.length > 2) {
        // find first tag position
        var startingPos = nextString.indexOf("<");
        var tag = '';
        // identify first tag
        if (startingPos > -1) {
            while (nextString[startingPos] != ' ' && nextString[startingPos] != '>' && startingPos != nextString.length) {
                if (nextString[startingPos] != '?' && nextString[startingPos] != "<") {
                    tag += nextString[startingPos];
                }
                startingPos++;
            }
        }

        // replace opening tag
        tag = tag.replace('<', '');

        // save the tag found
        sameLevelTags[counter] = tag;

        // identify closing tag
        var closingTag = "</" + tag + ">";

        // update string to find more tags after the closing of current found tag
        var beginning = 0;

        if (isSelfClosingTag(nextString, tag)) {
            beginning = nextString.indexOf(">") + 1;
        } else {
            beginning = nextString.indexOf(closingTag) + closingTag.length;
        }

        nextString = nextString.substring(beginning, nextString.length);

        // update save position
        counter++;
    }

    return sameLevelTags;
}

// function to indentify if the current tag is self closing or not
function isSelfClosingTag(xml, tag) {
    var pos = xml.indexOf(tag);
    var input = '';

    do {
        input += xml[pos];
        pos++;
    }
    while (xml[pos] != ">");

    input += ">";

    var end = input.length - 2;
    if (input[end] != '/' && input[end] != '?') {
        return false;
    } else {
        return true;
    }
}

// function to indentify the substring of the current tag
function indentifySubstring(xml, currentTag, finishTag) {

    var starting = xml.indexOf(currentTag) + 1;
    while (xml[starting] != ">") {
        starting++;
    }
    starting++;
    var ending = xml.indexOf(finishTag);
    var substring = xml.substring(starting, ending);
    return substring;
}

// function to find attributes of the current tag
function findAttributes(xml, currentTag) {
    var starting = xml.indexOf(currentTag);
    var input = '';
    while (xml[starting] != '>') {
        input += xml[starting];
        starting++;
    }
    input += xml[starting];

    var foundAttributes = {};

    // while key value pair exists. ex - attrib=123
    while (input.indexOf(' ') != -1) {
        // find key value pair
        var point = input.indexOf(' ') + 1;
        var key = '';

        if (input.indexOf("=") == -1) {
            break;
        }

        // find key
        while (input[point] != '=' && input[point] != '?' && input[point] != '/' && input[point] != '>') {
            key += input[point];
            point++;
        }

        var point = input.indexOf("=") + 1;
        var value = '';
        var openingTag = input[point];
        point++;

        // find key
        while (input[point] != openingTag) {
            value += input[point];
            point++;
        }

        value = value.replace(/"/g, '');

        // save found attribute
        foundAttributes[key] = value;

        // remove found attribute from input
        input = input.replace("=", '');
        input = input.replace(" ", '');
    }

    return foundAttributes;
}

function filterCDATA(xml) {
    while (xml.indexOf("<![CDATA[") != -1) {
        var starting = xml.indexOf("<![CDATA[");
        var ending = xml.indexOf("]]>") + 3;
        var substring = xml.substring(starting, ending);
        var formattedString = substring;
        formattedString = formattedString.replace(/<![CDATA[/g, "").replace(/]]>/g, "");
        formattedString = formattedString.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        xml = xml.replace(substring, formattedString);
    }
    return xml;
}

module.exports = function (xml) {
    xml = filterCDATA(xml);
    var result = execute(xml);
    // console.log(JSON.stringify(result));
    return result;
};
