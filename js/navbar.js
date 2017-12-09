/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

/* START navbar code */
function toggleNav() {
  "use strict";
  var nav = document.getElementById('navbarCollapse');
  nav.classList.toggle('collapse');
}

function toggleDropdown() {
  "use strict";
  var dropdown = document.getElementById('navbarDropdownMenu');
  dropdown.classList.toggle('show');
}

window.onclick = function (e) {
  "use strict";
  if (!e.target.matches('.dropdown-toggle')) {
    var dropdown = document.getElementById('navbarDropdownMenu');
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
};

//function permission(){
  //"use strict";
  
  /* get current user */
  //firebase.auth().onAuthStateChanged(function (user) {
    //if (user) {
      /* if user is fan */
      /* if user is coach */
      /* if user is manager */
      
    //} 
  //});
  
//}
/* END navbar code */