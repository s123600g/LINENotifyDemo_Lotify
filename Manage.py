# -*- coding: utf-8 -*-

from Server import app, db
from flask_script import Manager, Command, Server
from flask_migrate import Migrate, MigrateCommand

# Create Flask Manager Instance
manager = Manager(app)
# Create Flask Migrate Instance
migrate = Migrate(app, db)

# Create manager command for database activity. ex: init(initialize)、migrate、upgrade(commit)
manager.add_command('db', MigrateCommand)

# 設定 python manage.py runserver 為啟動 server 指令
manager.add_command('runserver', Server(
    host='127.0.0.1', port=8080, use_debugger=True, threaded=True))

if __name__ == '__main__':

    manager.run()
