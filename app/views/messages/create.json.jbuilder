json.content @message.content
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
json.image   @message.image.url
json.id   @message.id