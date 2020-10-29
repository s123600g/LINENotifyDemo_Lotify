---
title: LINENotifyDemo_Lotify
tags: Lotify, LINE Notify , Flask
---

---
使用Flask搭配Vue建置一個Line Notify簡單實例，參考[Lotify - LINE Notify client SDK](https://github.com/louis70109/lotify)來針對**LINE Notify**簡單操作基本文字訊息發送與用戶訂閱。


參考資源：
* [LINE Notify API Document](https://notify-bot.line.me/doc/en/)
* [LINE Notify](https://notify-bot.line.me/zh_TW/)


---

建立LINE Notify服務登錄
--
![](https://i.imgur.com/E4b7New.png)



套件安裝
--
```shell=
pip3 install -r requirements.txt
```

NPM 套件載入
--
`package.json`在專案目錄內`static`底下
```shell=    
npm i
```


設定Client ID、Client Secret、Redirect_uri
--
在`Config.py`內自行進行設置以下參數
```python=
CLIENT_ID = "V....................v"
SECRET = "0..........................6"
URI = "http://127.0.0.1:8080/api/user_callback"
```


啟動測試伺服器
--
```shell=
sudo sh StartServer.sh
```
![](https://i.imgur.com/PQ4PEp5.png)

![](https://i.imgur.com/4Kr1WLj.png)


用戶訂閱
--
![](https://i.imgur.com/B79efgX.png)


發送訊息給用戶
--

![](https://i.imgur.com/3HgKdwj.png)

![](https://i.imgur.com/L7Axsno.jpg)




