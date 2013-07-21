function mason(div,selector,columns,width) {
   if($(div).attr("class") != "shift") {
      $(div).css({"position":"relative"});
      var columnscore=new Array();
      for (var i=0; i<columns; i++) { 
         columnscore[i]=0;
      }
      $(div+'>'+selector).each(function() {
         var count=0, lowest=columnscore[0], lowest_id=0;
         while(++count < columnscore.length) {
            if(columnscore[count] < lowest) {
               lowest_id = count;
               lowest = columnscore[count];
            }
         }
         $(this).css({"position":"absolute","top":lowest+"px","left":lowest_id*width+"px"});
         columnscore[lowest_id] = columnscore[lowest_id] + $(this).outerHeight() - 1;
      });
      $(div).css({"height":Math.max.apply(Math, columnscore)+"px"});
   }
}

function callMason() {
   mason('#container','.articlebox',3,320);
}
function slider(slidewidth) {
   var count = $("#slides .slide").length;
   $("#slides").css({"width":(count*slidewidth)+"px"});
   slide(count,slidewidth);
}

function slide(count,slidewidth) {
   if(parseFloat($("#slides").css("left"))==-(count-1)*slidewidth) {
      pos="0";
   } else {
      pos="-="+slidewidth;
   }
   $("#slides").delay(7000).animate({
      left: pos
   }, 800, function() {
      slide(count,slidewidth);
   });
}

$(document).ready(function() {
   var slidewidth = 959;
   slider(slidewidth);
   $("#slider #navigation #next").click(function() {
      $("#slides").stop(true,false);
      var count = $("#slides .slide").length;
      if (parseFloat($("#slides").css("left")) % slidewidth == 0 || parseFloat($("#slides").css("left"))=="0") {
         if(parseFloat($("#slides").css("left"))==-(count-1)*slidewidth) {
            pos="0";
         } else {
            pos="-="+slidewidth;
         }
      } else {
         pos=Math.floor(parseFloat($("#slides").css("left"))/slidewidth)*slidewidth;
      }
      $("#slides").animate({
         left: pos
      }, 800);
      return false;
   });
   $("#slider #navigation #previous").click(function() {
      $("#slides").stop(true,false);
      var count = $("#slides .slide").length;
      if (parseFloat($("#slides").css("left")) % slidewidth == 0 || parseFloat($("#slides").css("left"))=="0") {
         if(parseFloat($("#slides").css("left"))==0) {
            pos=-(count-1)*slidewidth;
         } else {
            pos="+="+slidewidth;
         }
      } else {
         pos=Math.ceil(parseFloat($("#slides").css("left"))/slidewidth)*slidewidth;
      }
      $("#slides").animate({
         left: pos
      }, 800);
      return false;
   });
   $(".coming_soon").click(function() {
      return false;
   })
   $(".coming_soon").hover(function(e) { $("body").prepend('<div class="tooltip"><img src="images/pointer.jpg" />coming soon</div>'); $(".tooltip").css({"top": $(this).offset().top+25+"px", "left": e.pageX-45+"px"}); }, function() { $(".tooltip").remove(); });
   callMason();
   //$("#more").click(function() {
   //   $(this).remove();
   //   $.ajax({
   //      url: "more.html",
   //      cache: false
   //   }).done(function( html ) {
   //      $("#container").append(html);
   //      callMason();
   //      setTimeout(function(){
   //         callMason();
   //      }, 1000);
   //   });
   //   return false;
   //});
});

$(window).load(function () {
   $(".articlebox img").each(function() {
      if($(this).width() < 20 || $(this).height() < 20 ) {
         $(this).remove();
      }
   });
   callMason();
   setTimeout(function(){
      callMason();
   }, 1000);
});