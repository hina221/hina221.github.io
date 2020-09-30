
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
    var topBtn = $('#back-top');
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



// ギャラリーページ
$(function () {

  $('#gallery').each(function () {

    // #gallery要素がギャラリーコンテナーになる
    var $container = $(this);

    // オプションを設定しMasonryを準備
    $container.masonry({
      columnWidth: '.gallery-item',
      gutter: 5,
      itemSelector: '.gallery-item'
    });

    // JSONファイルをリクエストし、成功したら関数を実行
    $.getJSON('./data/content.json', function (data) {
      // ループで生成したDOM要素を一時的に保存する配列
      var elements = [];

      // JSONの配列(data)の要素(item)ごとにループ処理
      $.each(data, function (i, item) {

        // 配列の要素からHTML文字列を生成
        var itemHTML =
        '<li class="gallery-item is-loading ' +(item.className||'')+ '">' +
          '<a href="' + item.images.large + '">' +
            '<img src="' + item.images.thumb +
                '" alt="' + item.title + '">' +
                '<span class="caption">' +
                '<span class="inner"> '+ item.title +'</span>' +
                '</span>' +
          '</a>' +
        '</li>';

      //HTML文字列をDOM要素化し、配列に追加
      elements.push($(itemHTML).get(0));
  });

  //DOMを挿入
  $container.append(elements);

  $container.find('a').colorbox({
    maxWidth: '95%',
    maxHeight: '95%',
    slideshow:true,
    title: function () {
      return $(this).find('.inner').html();
    }
  });
  //画像の読み込みが完了したらMasonryレイアウト
  $container.imagesLoaded(function () {
    $(elements).removeClass('is-loading');
    $container.masonry('appended', elements);
    $container.masonry('layout');
     });
   });
   $container.on('mouseenter mouseleave',
                    '.gallery-item a', hoverDirection);
 });
 function hoverDirection(event) {
   var $overlay = $(this).find('.caption'),
       side = getMouseDirection(event),
       animateTo,
       positionIn = {
         top: '0%',
         left: '0%'
       },
       positionOut = (function ( ) {
         switch (side) {
           case 0: return { top: '-100%', left:    '0%'};
                   break;
           case 1: return { top:    '0%', left:  '100%'};
                   break;
           case 2: return { top:  '100%', left:    '0%'};
                   break;
          default: return { top:    '0%', left: '-100%'};
                   break;
         }
       })();
    if (event.type === 'mouseenter') {
      animateTo = positionIn;
      $overlay.css(positionOut);
    } else {
      animateTo = positionOut;
    }
    $overlay.stop(true).animate(animateTo, 250);
 }
 function getMouseDirection (event) {
   var $el = $(event.currentTarget),
       offset = $el.offset(),
       w = $el.outerWidth(),
       h = $el.outerHeight(),
       x = (event.pageX - offset.left - w / 2)
                               *((w > h)? h / w: 1),
       y = (event.pageY - offset.top - h / 2)
                               *((h > w)?w / h: 1),
       direction = Math.round((((Math.atan2(y, x)*
                        (180 / Math.PI)) + 180 ) / 90 ) + 3 ) % 4;
   return direction;
 }
});
