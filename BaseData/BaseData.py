# -*- coding: utf-8 -*-

from Startup import db
from sqlalchemy import Column, Integer, DateTime, Text

class Base_Data(db.Model):

    __tablename__ = 'base_data'

    ID = Column(Integer, primary_key=True, autoincrement=True , comment='編號')

    user_token = Column(Text(), nullable=False, comment='訂閱戶授權token')

    InertDate = Column(DateTime(), nullable=False, comment='訂閱日期')