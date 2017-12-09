/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

var id;
var teamName;

function handleUpdate() {
  "use strict";

  var inputs = document.querySelectorAll('.form-control');
  var datetime = localStorage.getItem("datetime");
  
  if (datetime != null) {
    firebase.database().ref('/Games/' + datetime).update({
      stats: {
        us: {
          "0-foul": inputs[1].value,
          "1-red-card": inputs[3].value,
          "2-yellow-card": inputs[5].value,
          "3-shot-on-goal": inputs[7].value,
          "4-goal": inputs[9].value,
          "5-corner-kick": inputs[11].value,
          "6-goal-kick": inputs[13].value,
          "7-p-time": inputs[15].value
        },
        them: {
          "0-foul": inputs[2].value,
          "1-red-card": inputs[4].value,
          "2-yellow-card": inputs[6].value,
          "3-shot-on-goal": inputs[8].value,
          "4-goal": inputs[10].value,
          "5-corner-kick": inputs[12].value,
          "6-goal-kick": inputs[14].value,
          "7-p-time": inputs[16].value
        }
      }
    }).then(function (res) {
      window.location = "/teamstats.html";
    });
  } else {
    alert('invalid id');
  }
}

function handleAccessRecordMatch(){
  var userId = localStorage.getItem("user");
  if(userId != null){
    var query = firebase.database().ref('Users/' + userId);
    query.once("value").then(function(snapshot) {
      var coach = snapshot.child("coach").val();
      var manager = snapshot.child("manager").val();

      if(coach == true || manager == true){
        document.getElementById('record-match-id').className = "nav-item active";
      }

    })
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  "use strict";
  firebase.database().ref('/Globals').once('value').then(function (snapshot) {
    teamName = snapshot.child('TeamName');
    id = snapshot.child('GameCounter').val();
    document.getElementById('us').innerHTML = teamName.val();
    firebase.database().ref('/Globals/GameCounter').set(parseInt(id, 10) + 1);
  });
})



// populate dropdown
function handleChooseDate(){
  var dropdown = document.getElementById("datetimeDropdown");
  var query = firebase.database().ref("Games").orderByKey();

  var option2 = document.createElement("option");
  option2.text = "Select a date & time";
  dropdown.add(option2);
  
  query.once("value").then(function(snapshot){

  snapshot.forEach(function(childSnapshot){ // looping

    var datetime = childSnapshot.child("datetime").val();
    
    var option = document.createElement("option");
    option.text = datetime;

    dropdown.add(option);
    })
  })
}




function changeField(){
  var dropdownText = 0;
  var dropdown = document.getElementById("datetimeDropdown");
  
  for(var i = 0, len = dropdown.options.length; i < len; i++){
    var opt = dropdown.options[i];
    if (opt.selected === true){
      dropdownText = opt.text
    }
  }
  
  
  var opponentName = firebase.database().ref("Games/" + dropdownText);
  opponentName.once("value").then(function(snapshot){
    var opponentNameVal = snapshot.child("them").val();
    var locationNameVal = snapshot.child("location").val();
    document.getElementById("opponentName").innerHTML = opponentNameVal;  
    document.getElementById("locationName").innerHTML = locationNameVal;
  })
  
}