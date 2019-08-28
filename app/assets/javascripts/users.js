$(document).on('turbolinks:load',function(){

    function appendUser(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name=${user.name}>追加</a>
                  </div>`
      $('.user-search-result').append(html);
    }
    function appendErrMsgToHTML(alert){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${alert}</p>
                  </div>`
      $('.user-search-result').append(html);
    }
    function addUser(userId,userName){
      var html = `<div class="chat-group-user">
                      <input name="group[user_ids][]" type="hidden" value="${userId}">
                      <p class="chat-group-user__name">${userName}</p>
                      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
                  </div>`
      $('#sarch-users').append(html);
    }
    function removeUser(userId,userName){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add.chat-group-user__btn.chat-group-user__btn--add.data-user-id="${user.id}" data-user-name=${user.name}>追加</a>
                　</div>`
    　　$('.user-search-result').append(html);
    }
    // 検索のイベント
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $(".user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーは見つかりません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });
    // ユーザー追加のイベント
    $(".user-search-result").on("click", ".chat-group-user__btn--add", function(){
    var userId = $(this).data('user-id');
    var userName = $(this).data('user-name');
    $(this).parent().remove();
    addUser(userId,userName);
    });
    // サーチ画面を消すイベント
    $(document).on("click", ".user-search-remove", function () {
      $(this).parent().remove();
    });
});
