module.exports = function() {
  var form = document.getElementById("subscribe-form");

  document.getElementById("subscribe").addEventListener("click", function () {
    form.submit();
  });
}
