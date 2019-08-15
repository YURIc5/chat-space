
# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|user_name|string|null: false,add_index|
### Association
- has_many :messages
- has_many :groups-users
- has_many :groups, though: :groups-users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :groups-users
- has_many :users, though: :groups-users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
