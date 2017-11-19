var $ = require('jquery');
var swal = require('sweetalert');

module.exports = function() {
  var input = $("#subscribe-email");
  var button = $("#subscribe");

  button.click(function() {
    var email = input.val();
    if (email.indexOf('@') === -1) { return; }
    $.post("/subscribe/", { email: email }, function(data, status){
      if (status === 'success') {
        swal({
          title: "Success!",
          text: "You are now subscribed and will recieve updates 😃",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
      } else {
        swal({
          title: "Oh noes!",
          text: "Something, somewhere went wrong ",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
      }
    });
  });
}
