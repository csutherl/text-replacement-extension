(function () {
    var keyword = "";
    var buffer = false;
    var replace = false;

    // This is specific to SFDC case comments. Might want to make it more generic. Or go the other way and make it SFDC exclusive. 
    $('input[id=newCaseCommentButton]').click(function () {
        setTimeout(function () {
            console.debug("Delaying call by .5 seconds.");
            var areaSelector = $('textarea[id=new_text]');
            areaSelector.keyup(function (event) {
                var key = String.fromCharCode(event.which);
                var keyCode = event.which;
                //console.debug(key);
                //console.debug(keyCode);
                if (keyCode == 186) {
                    if (buffer) {
                        buffer = false;
                        replace = true;
                    } else {
                        buffer = true;
                    }
                    key = ""; // remove the prepended ':'
                    console.debug("buffer == " + buffer);
                }

                if (buffer && key.length > 0) {
                    keyword = keyword + key;
                    console.debug("Appended " + key + " to " + keyword);
                }

                if (keyword != "" && replace) {
                    console.debug("Replacing \'" + keyword + "\'");
                    replaceKeywords(areaSelector, keyword.toLowerCase()); 
                    keyword = "";
                }
            });
        }, 500);
    });
})();

function replaceKeywords(input, keyword) {
    console.debug("replaceKeywords called with \'" + keyword + "\'");
    chrome.storage.sync.get(keyword, function(items) {
        for (key in items) {
            console.debug("Key: " + key + ", Value: " + items[key]);
            input.val(input.val().replace(":" + key + ":", items[key]));
        }
    });
}

