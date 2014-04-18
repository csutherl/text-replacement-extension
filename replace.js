$.getJSON("file://wordlist.json", function (data) {
    console.debug("Loading wordlist.json");
}).done(function () {
    var items = [];
    $.each( data, function( key, val ) {
        //items.push(key + " " + val);
        console.debug(key);
    });
   
    // This is specific to SFDC case comments. Might want to make it more generic. Or go the other way and make it SFDC exclusive. 
    $('input[id=newCaseCommentButton]').click(function () {
        setTimeout(function () {
            console.debug("Delaying call by .5 seconds.");
            var areaSelector = $('textarea[id=new_text]');
            areaSelector.keyup(replaceKeywords(areaSelector));
        }, 500);
    });
});

function replaceKeywords(input) {
    console.debug("replaceKeywords called");
    input.val(input.val().replace(':keyword:', 'keyword sentence junk'));
}
