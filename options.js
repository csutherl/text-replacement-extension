// Saves options to chrome.storage
function save_options() {
    var options = {};

    $("#mytable tr").each(function () {
        // this is broken. it grabs all td's for each row. need to iterate over each individual td for each row.
        $('td').each(function () {
            var tarea = $(this).find('textarea');

            if (tarea.length > 0) {
                var key = tarea.attr('id');
                var value = tarea.text();
                console.debug('key: ' + key + ' value: ' + value);
            }
        })
    });

    // initial testing
    chrome.storage.sync.set(options, function(items) {
        for (key in items) {
            console.debug("Saving: \'" + items[key] + "into " + key);
        }
        
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    console.debug("restore_options called");

    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(null, function(items) {
        // document.getElementById('test').value = items.test;
        for (key in items) {
            console.debug("key: " + key + ", value: " + items[key]);
            append_to_table(key, items[key]);
        }
    });
}

function append_to_table(option_name, option_value) {
    option_value = typeof option_value !== 'undefined' ? option_value : '';

    $('#mytable tr:last').after('<tr>')
        .after('<td><textarea id=\'' + option_name + '\'>' + option_value + '</textarea></td>')
        .after('<td><label>' + option_name + '</label></td>')
        .after('</tr>');
}

function add_option() {
    name = prompt("What is the keyword?");

    if (name.length > 0 && name != 'null') {
        chrome.storage.sync.get(name, function(items) {
            var value = null;
            for (key in items) {
                value = key;
            }
           
            // if value == null then the key did not exist previously 
            if (value == null) {
                append_to_table(name);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('add').addEventListener('click', add_option);
