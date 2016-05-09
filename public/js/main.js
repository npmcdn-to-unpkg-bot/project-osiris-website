$(document).ready(function() {
  // Set title preview
  $("#title").on('keyup', function(e) {
    $("#title-preview").text($("#title").val());
    $("#title-preview").attr("href", $("#url").val());
  })
  // Show grid
  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 80
  });
});
