# !/bin/bash
PATH=/sbin:/bin:/usr/bin


# Use source or . command by terminal.
# Ex: source script.sh  ||  . script.sh
# Not use sh command by terminal.



echo '設定Flask Server 環境參數設定.'

echo '設定FLASK_APP.'

#指定APP Name，主Server程式進入點 。
export FLASK_APP=Server.py

sleep 1s

echo '設定FLASK_ENV.'
echo '啟用developerment開發者模式'
echo 

#設定運作環境，developerment開發者模式、production封裝運作模式。
export FLASK_ENV=developerment
#export FLASK_ENV=production

sleep 1s

echo '設定FLASK_DEBUG.'
echo '設定DeBug 除錯狀態'
echo

#設定DeBug狀態，1代表除錯，0代表非除錯。
export FLASK_DEBUG=1

sleep 1s

echo 'Flask Server 環境參數設定完成.'

echo

# echo '3秒後開始啟動Flask Server.....'

# sleep 3s

#透過Manage.py啟動Flask Server
python3 Manage.py runserver
