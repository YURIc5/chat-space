$(document).on('turbolinks:load',function(){
  function buildMessage(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id = ${message.id}>
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                    ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                    ${message.date}
                    </p>
                  </div>
                  <div class="lower-message">
                    <p class="message__text">
                    ${content}
                    </p>
                  </div>
                  <img class = "lawer-message__image">
                  ${img}
                </div>`
    return html;
  }
});
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
      $('.submit-btn').prop('disabled', false);
    })
  })
$(document).on('turbolinks:load',function(){
  // 自動更新
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id =  $('.message:last').data("id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildMessage(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
setInterval(reloadMessages, 5000);
});

