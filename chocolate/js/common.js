// ハンバーガーメニューの開閉 //
$('#js-nav-button').on('click',function(){
    $('#js-nav-box').toggleClass('open');
});

// メニューの項目をクリックした時　//
$('nav a').on('click',function(){
  $('#js-nav-box').removeClass('open');
});

// スクロールしたときのアニメーション //
$(window).on('scroll', function (){
  var scrollPos = $(window).scrollTop();
  var wh = $(window).height();
  var scrollBottom =scrollPos+wh;
  $('.js-animate').each(function(){
     var elemOffset = $(this).offset().top;
     var delay = $(this).data('delay')||0;
     if(scrollBottom>elemOffset){
           $(this).delay(delay*1000).queue(function(){
             $(this).addClass('active');
           });
     }
  })
});


$(function () {
    var topBtn = $('#page-top');
    topBtn.hide();
    // スクロールが500に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    //スルスルっとスクロールでトップへもどる
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});

$(function(){
        // #で始まるリンクをクリックしたら実行されます
        $('a[href^="#"]').click(function() {
          // スクロールの速度
          var speed = 400; // ミリ秒で記述
          var href= $(this).attr("href");
          var target = $(href == "#" || href == "" ? 'html' : href);
          var position = target.offset().top;
          $('body,html').animate({scrollTop:position}, speed, 'swing');
          return false;
        });
      });
