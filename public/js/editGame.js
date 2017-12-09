/*jslint devel: true*/
/*eslint-env browser*/
/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/
var id;
var teamName;

//Updates database information for a game schedule entry
function handleUpdate() {
    "use strict";

    var inputs = document.querySelectorAll('.form-control');
    var datetime = localStorage.getItem("datetime");

    if (datetime != null) {
        firebase.database().ref('/Games/' + datetime).update({
            them: inputs[0].value,
            location: inputs[1].value,
            datetime: inputs[2].value
        }).then(function(res) {
            window.location = "/view-game-schedule.html";
        });
    } else {
        alert('invalid id');
    }
}

//Deletes game schedule entry
function handleDelete() {
    "use strict";
    var datetime = localStorage.getItem("datetime");
    if (confirm("Are you sure you want to delete this event?")) {
        if (datetime != null) {
            firebase.database().ref('/Games/' + datetime).set(null).then(function(res) {
                window.location = "/view-game-schedule.html";
            });
        } else {
            alert('invalid id');
        }
    }
}

// Handles the population of the table.
document.addEventListener("DOMContentLoaded", function(event) {
    "use strict";



    firebase.database().ref('/Globals').once('value').then(function(snapshot) {
        teamName = snapshot.child('TeamName');
    });

    //var url = new URL(window.location.href);
    //id = url.searchParams.get("id");

    var datetime = localStorage.getItem("datetime");
    alert('datetime is ' + datetime);

    if (datetime != null) {
        firebase.database().ref('/Games/' + datetime).once('value').then(function(snapshot) {
            if (!snapshot.exists()) {
                alert('Not a recorded game');
                window.location = "/view-game-schedule.html";
            }

            var datetime = snapshot.child('datetime'),
                location = snapshot.child('location'),
                // gameType = snapshot.child('gameType'),
                them = snapshot.child('them'),
                // status = snapshot.child('status'),
                inputs = document.querySelectorAll('.form-control');


            inputs[0].value = them.val();
            inputs[1].value = location.val();
            inputs[2].value = datetime.val();

        });
    } else {
        alert('Not a valid game, ' + datetime);
        window.location = "/view-game-schedule.html";
    }
});

/*ESLint Problems: None */