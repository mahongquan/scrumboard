# -*- coding: utf-8 -*-
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "scrumboard.settings")
from scrumboard.board.models import *
from django.contrib.auth.models import Group
import django
def genuser(uname):
    try:
        u=User()
        u.username=uname
        u.set_password("1")
        u.is_staff=True
        u.save()
    except django.db.utils.IntegrityError,e:
        print e
def deluser(uname):
    u=User.objects.get(username=uname)
    u.delete()
def getuser(uname):
    u=User.objects.get(username=uname)
    return u
def getall():
    us=User.objects.all()
    for u in us:
        print u.username
def tosuper(uname):
    u=getuser(uname)
    u.is_superuser=True
    u.save()
if __name__ == "__main__":
    #genuser("admin")
    tosuper("admin")