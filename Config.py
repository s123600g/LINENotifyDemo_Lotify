# -*- coding: utf-8 -*-

import os

''' 
Server Basic Config 
'''
class BaseConfig():

    # Flask 主要目錄設置
    static_url_path = '/static'
    static_folder = 'static'
    template_folder = 'templates'

    # 設置DB實體連接
    SQLALCHEMY_DATABASE_URI = "sqlite:////{}".format(os.path.join(os.getcwd(),"Data.db"))
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLAlCHEMY_COMMIT_ON_TEARDOWN = False

''' 
Server start up for develop status config 
'''
class DevelopermentConfig(BaseConfig):

    DEBUG = True
    SECRET_KEY = "FLAskOsw12j/3yX R~Xkl!fgN]baseD/,?TT"

class ProductionConfig(BaseConfig):

    DEBUG = False
    SECRET_KEY = "flAsK02385m/4eq s~Xkl!fgN]baseP/,?RL"

# 環境模式參數設置
config = {

    'developermentConfig': DevelopermentConfig,
    'productionConfig': ProductionConfig,
    # 網站運作是否為開發模式，用在Flask初始化載入封裝模式選擇
    'run_mode_dev':True
}

CLIENT_ID = "VfFhQdeyyxhDwMkExM55Jv"
SECRET = "0ly6wxhpYGYnDoUGtTSZfhzzlIj8UNQ4PZ3QAxAtfN6"
URI = "http://127.0.0.1:8080/callback"


