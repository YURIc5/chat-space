$(function(){
  function buildMessage(message){
    var html = `<p class="message__upper-info__talker">
                  ${message.user_name}
                </p>
                <p class="message__upper-info__date">
                ${message.date}
                </p>
                <p class="message__text">
                  ${message.content}
                </p>`
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
      $('#message_content').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});


