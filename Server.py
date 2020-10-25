# -*- coding: utf-8 -*-

from Startup import app, db
from flask import render_template , request , jsonify
from lotify.client import Client
from Config import CLIENT_ID , SECRET , URI

import uuid
import datetime as dtime
import pytz

lotify = Client(client_id=CLIENT_ID, client_secret=SECRET, redirect_uri=URI)

'''
----------------------------------------------------------------------
匯入資料表模型
----------------------------------------------------------------------
'''
from BaseData.BaseData import Base_Data
from BaseData.HistoryData import History_Data
'''-------------------------------------------------------------------'''

'''
----------------------------------------------------------------------
網站頁面-404 Not Found實作區塊 
----------------------------------------------------------------------
'''
@app.errorhandler(404)
def page_not_found(e): # 404 Not Found頁面
    return 'PageNotFound 404', 404
'''-------------------------------------------------------------------'''

'''
----------------------------------------------------------------------
API user_subscribe 實作區塊 
----------------------------------------------------------------------
'''
@app.route("/api/user_subscribe", methods=['GET'])
def user_subscribe():

    # 取得訂閱授權連結，用在前端導向客戶端到授權頁面去
    link_str = lotify.get_auth_link(state=uuid.uuid4())

    return jsonify(link_str = link_str)
'''-------------------------------------------------------------------'''


'''
----------------------------------------------------------------------
API user_callback 實作區塊 
----------------------------------------------------------------------
'''
@app.route("/api/user_callback", methods=['GET'])
def user_callback():

    # 從回傳的網址中取出'code'參數值
    access_token = lotify.get_access_token(code=request.args.get("code"))

    '''
    紀錄訂閱戶授權token
    '''
    db.session.add(
        Base_Data(
            user_token = access_token,
            InertDate = dtime.datetime.now(pytz.timezone("Asia/Taipei")).strftime('%Y-%m-%d %H:%M:%S')
        )
    )

    db.session.commit()

    return jsonify(access_token = access_token)
'''-------------------------------------------------------------------'''

'''
----------------------------------------------------------------------
API sendMessage 實作區塊 
----------------------------------------------------------------------
'''
@app.route("/api/sendMessage", methods=['POST'])
def sendMessage():

    get_bodyData = request.get_json(force=True)

    get_sendMsg = get_bodyData["msg"]

    '''
    紀錄歷史發送訊息
    '''
    db.session.add(
        History_Data(
            msg = get_sendMsg,
            InertDate = dtime.datetime.now(pytz.timezone("Asia/Taipei")).strftime('%Y-%m-%d %H:%M:%S')
        )
    )

    db.session.commit()

    # 取出全部歷史訊息
    get_HistoryMsg = History_Data.query.all()

    '''
    從資料庫取出訂閱戶token清單
    '''
    get_UserList = Base_Data.query.all()

    '''
    進行用戶發送訊息
    '''
    for Udate in get_UserList:

        temp_user_token = Udate.user_token

        # 取得用戶檢查可發送狀態值
        status = lotify.status(access_token="{}".format(temp_user_token))

        # 如果為200就代表可發送
        if status['status'] == 200:

            # 進行發送訊息
            response = lotify.send_message(
                access_token=temp_user_token,
                message=f"{get_sendMsg}"
            )

    return get_HistoryMsg
'''-------------------------------------------------------------------'''


'''
----------------------------------------------------------------------
頁面-index 實作區塊 
----------------------------------------------------------------------
'''
@app.route("/", methods=['GET'])
def index():

    return render_template('index.html')
'''-------------------------------------------------------------------'''


