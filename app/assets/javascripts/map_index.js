$(document).ready(function(){

  $(".instagram-index").scroll(function(){
    var x = $(window).width() - 10
    var element = document.elementFromPoint(x, 200).closest('div');
    // console.log(x)
    // console.log(element)
    console.log($(document).scrollTop())
  });

});