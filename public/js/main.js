$(document).ready(function() {
  $("#title").on('keyup', function(e) {
    $("#title-preview").text($("#title").val());
    $("#title-preview").attr("href", $("#url").val());
  })
  $("#url").on('keyup', function(e) {
    $("#img-preview").attr("src", $("#url").val());
  })
  // Replace broken images
  $("#img-preview").error(function() {
    $(this).attr("src", "http://dummyimage.com/800x600&text=Pinternet");
  });
  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    fitWidth: true,
    transitionDuration: '0.8s',
    columnWidth: 5
  });
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });
});
