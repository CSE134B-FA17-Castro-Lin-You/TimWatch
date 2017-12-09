/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

function handleLogin() {
  "use strict";
  var email = document.getElementById("inputEmail").value.trim(),
    password = document.getElementById("inputPassword").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
  });
}


firebase.auth().onAuthStateChanged(function (user) {
  "use strict";
  if (user) {
    //console.log("Welcome " + user.displayName + ": email = " + user.email);
    localStorage.setItem("user",user.uid);  
    window.location = "/view-game-schedule.html";
  } else {
   // console.log("Goodbye");
  }
});

/*ESLint Problems: None */