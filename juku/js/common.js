// ハンバーガーメニューの開閉 //
$('#js-nav-button').on('click',function(){
    $('#js-nav-box').toggleClass('open');
});

// メニューの項目をクリックした時　//
$('nav a').on('click',function(){
  $('#js-nav-box').removeClass('open');
});
// find elements
$("#staticform").submit(function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://api.staticforms.xyz/submit', // url where to submit the request
    type: "POST", // type of action POST || GET
    dataType: 'json', // data type
    data: $("#staticform").serialize(), // post data || get data
    success: function(result) {
      // you can see the result from the console
      // tab of the developer tools
      alert(JSON.parse(result));
    },
    error: function(xhr, resp, text) {
      alert(xhr, resp, text);
    }
  })
});
