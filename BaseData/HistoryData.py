# -*- coding: utf-8 -*-

from Startup import db
from sqlalchemy import Column, Integer, DateTime, Text

class History_Data(db.Model):

    __tablename__ = 'history_data'

    ID = Column(Integer, primary_key=True, autoincrement=True , comment='編號')

    msg = Column(Text(), nullable=False, comment='歷史訊息')

    InertDate = Column(DateTime(), nullable=False, comment='發送日期')