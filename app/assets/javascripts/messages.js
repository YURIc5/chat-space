$(document).on('turbolinks:load',function(){
  function buildMessage(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
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
                  ${img}
                </div>`
    return html;
  }
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
});


