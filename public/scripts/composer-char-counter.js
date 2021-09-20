 $(document).ready(function() {
   $('textarea').keyup(function() {
     let count = $(this).val().length;
     if (count <= 140) {
       $(this)
         .closest(".new-tweet")
         .find(".counter")
         .removeClass("exceed-limit")
         .text(140 - count);
     } else {
       $(this)
         .closest(".new-tweet")
         .find(".counter")
         .addClass("exceed-limit")
         .text(140 - count);
     }
   })
 });