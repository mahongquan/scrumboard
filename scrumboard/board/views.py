# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
import time
import os
import logging
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.hashers import  check_password, make_password
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User,Group
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist#,DoesNotExist
from django.forms.models  import modelform_factory
from datetime import datetime
from django.forms import ModelForm
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.context_processors import csrf
from django.template.context import RequestContext
import datetime
import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.models import Group
from django.shortcuts import render_to_response
from scrumboard.settings import STATIC_URL
from scrumboard.board.models import *
class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj,datetime.date):
            return "%d-%02d-%02d" % (obj.year,obj.month,obj.day)
        if isinstance(obj,datetime.datetime):
            return "%d-%02d-%02d" % (obj.year,obj.month,obj.day)
        if isinstance(obj,User):
            return obj.id
        if isinstance(obj,Board):
            return obj.id
        if isinstance(obj,Stage):
            return obj.id
        return json.JSONEncoder.default(self, obj)  
def app(request):
    return render_to_response("board/app.html",{"STATIC_URL":STATIC_URL})

def home(request):
    return render_to_response("index.html",{"STATIC_URL":STATIC_URL})
def boardOne(request,id=None):
	if request.method == 'GET':
		output=Board.objects.get(id=int(id)).json()
		return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
	if request.method == 'DELETE':
		obj=Board.objects.get(id=int(id))
		obj.delete()
		output=[]
		return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def board(request):
    logging.info("=board==========")
    logging.info(request)
    logging.info("------------------")
    if request.method == 'GET':
        return view_board(request)
    if request.method == 'POST':
        return create_board(request)
    if request.method == 'PUT':
        return update_board(request)
    if request.method == 'DELETE':
        return destroy_board(request)
def view_board(request):
    start=int(request.GET.get("start","0"))
    limit=int(request.GET.get("limit","5"))
    search=request.GET.get("search",'')
    search_bh=request.GET.get("search_bh",'')
    logging.info("search="+search)
    if search!='':
        if search_bh!='':
            total=Board.objects.filter(yonghu__contains=search).filter(hetongbh__contains=search_bh).count()
            objs = Board.objects.filter(yonghu__contains=search).filter(hetongbh__contains=search_bh)[start:start+limit]
        else:
            total=Board.objects.filter(yonghu__contains=search).count()
            objs = Board.objects.filter(yonghu__contains=search)[start:start+limit]
    else:
        if search_bh!='':
            total=Board.objects.filter(hetongbh__contains=search_bh).count()
            objs = Board.objects.filter(hetongbh__contains=search_bh)[start:start+limit]
        else:
            total=Board.objects.count()
            objs = Board.objects.all()[start:start+limit]
    data=[]
    for rec in objs:
        data.append(rec.json())
    output=data#{"total":total,"data":data}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def create_board(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    logging.info(data)
    rec=Board()
    rec.user=User.objects.get(id=1)
    # if data.get("channels")!=None:
    #     rec.channels=data.get("channels")
    rec.title=data["title"]
    rec.save()
    output={"success":True,"message":"Created new User" +str(rec.id)}
    output["data"]={"id":rec.id,"shenhe":rec.shenhe,"hetongbh":rec.hetongbh,"yiqibh":rec.yiqibh,"yiqixinghao":rec.yiqixinghao,"yujifahuo_date":rec.yujifahuo_date,"yonghu":rec.yonghu,"baoxiang":rec.baoxiang,"addr":rec.addr,"channels":rec.channels,"tiaoshi_date":rec.tiaoshi_date}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def update_board(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    id1=data.get("id")
    id1=int(id1)
    rec=Board.objects.get(id=id1)
    if data.get("hetongbh")!=None:
        rec.hetongbh=data["hetongbh"]
    if data.get("yujifahuo_date")!=None:
        dt=datetime.datetime.strptime(data["yujifahuo_date"],'%Y-%m-%d')
        rec.yujifahuo_date=dt.date()
    if data.get("yonghu")!=None:
        rec.yonghu=data.get("yonghu")
    if data.get("baoxiang")!=None:
        rec.baoxiang=data.get("baoxiang")
    if data.get("yiqixinghao")!=None:
        rec.yiqixinghao=data.get("yiqixinghao")
    if data.get("yiqibh")!=None:
        rec.yiqibh=data.get("yiqibh")
    if data.get("shenhe")!=None:
        rec.shenhe=data.get("shenhe")
    if data.get("addr")!=None:
        rec.addr=data.get("addr")
    if data.get("channels")!=None:
        rec.channels=data.get("channels")
    if data.get("tiaoshi_date")!=None:
        dt=datetime.datetime.strptime(data["tiaoshi_date"],'%Y-%m-%d')
        rec.tiaoshi_date=dt.date()
    rec.save()
    output={"success":True,"message":"update Board " +str(rec.id)}
    output["data"]={"id":rec.id,"shenhe":rec.shenhe,"hetongbh":rec.hetongbh,"yiqibh":rec.yiqibh,"yiqixinghao":rec.yiqixinghao,"yujifahuo_date":rec.yujifahuo_date,"yonghu":rec.yonghu,"baoxiang":rec.baoxiang,"addr":rec.addr,"channels":rec.channels,"tiaoshi_date":rec.tiaoshi_date}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def destroy_board(request):
    data = json.loads(request.body.decode("utf-8"))
    id=data.get("id")
    if id!=None:
        try:
            id1=int(id)
            rec=Board.objects.get(id=id1)
            rec.delete()
            output={"success":True,"message":"OK"}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
        except ObjectDoesNotExist as e:
            output={"success":False,"message":str(e)}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
    else:
        output={"success":False,"message":"OK"}
        return HttpResponse(json.dumps(output, ensure_ascii=False))
def stage(request):
    logging.info("=stage=")
    logging.info(request)
    logging.info("------------------")
    if request.method == 'GET':
        return view_stage(request)
    if request.method == 'POST':
        return create_stage(request)
    if request.method == 'PUT':
        return update_stage(request)
    if request.method == 'DELETE':
        return destroy_stage(request)
def view_stage(request):
    board_id=request.GET.get("board",'')
    board=Board.objects.get(id=int(board_id))
    logging.info(dir(board))
    objs =Stage.objects.filter(board=board_id) #board.stage_set()
    data=[]
    for rec in objs:
        data.append(rec.json())
    output=data#{"total":total,"data":data}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def create_stage(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    logging.info(data)
    rec=Stage()
    # if data.get("channels")!=None:
    #     rec.channels=data.get("channels")
    rec.save()
    output={"success":True,"message":"Created new User" +str(rec.id)}
    output["data"]={"id":rec.id,"shenhe":rec.shenhe,"hetongbh":rec.hetongbh,"yiqibh":rec.yiqibh,"yiqixinghao":rec.yiqixinghao,"yujifahuo_date":rec.yujifahuo_date,"yonghu":rec.yonghu,"baoxiang":rec.baoxiang,"addr":rec.addr,"channels":rec.channels,"tiaoshi_date":rec.tiaoshi_date}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def update_stage(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    id1=data.get("id")
    id1=int(id1)
    rec=Stage.objects.get(id=id1)
    if data.get("hetongbh")!=None:
        rec.hetongbh=data["hetongbh"]
    if data.get("yujifahuo_date")!=None:
        dt=datetime.datetime.strptime(data["yujifahuo_date"],'%Y-%m-%d')
        rec.yujifahuo_date=dt.date()
    if data.get("yonghu")!=None:
        rec.yonghu=data.get("yonghu")
    if data.get("baoxiang")!=None:
        rec.baoxiang=data.get("baoxiang")
    if data.get("yiqixinghao")!=None:
        rec.yiqixinghao=data.get("yiqixinghao")
    if data.get("yiqibh")!=None:
        rec.yiqibh=data.get("yiqibh")
    if data.get("shenhe")!=None:
        rec.shenhe=data.get("shenhe")
    if data.get("addr")!=None:
        rec.addr=data.get("addr")
    if data.get("channels")!=None:
        rec.channels=data.get("channels")
    if data.get("tiaoshi_date")!=None:
        dt=datetime.datetime.strptime(data["tiaoshi_date"],'%Y-%m-%d')
        rec.tiaoshi_date=dt.date()
    rec.save()
    output={"success":True,"message":"update Stage " +str(rec.id)}
    output["data"]={"id":rec.id,"shenhe":rec.shenhe,"hetongbh":rec.hetongbh,"yiqibh":rec.yiqibh,"yiqixinghao":rec.yiqixinghao,"yujifahuo_date":rec.yujifahuo_date,"yonghu":rec.yonghu,"baoxiang":rec.baoxiang,"addr":rec.addr,"channels":rec.channels,"tiaoshi_date":rec.tiaoshi_date}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def destroy_stage(request):
    data = json.loads(request.body.decode("utf-8"))
    id=data.get("id")
    if id!=None:
        try:
            id1=int(id)
            rec=Stage.objects.get(id=id1)
            rec.delete()
            output={"success":True,"message":"OK"}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
        except ObjectDoesNotExist as e:
            output={"success":False,"message":str(e)}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
    else:
        output={"success":False,"message":"OK"}
        return HttpResponse(json.dumps(output, ensure_ascii=False))     
def story(request):
    logging.info("=story=")
    logging.info(request)
    logging.info("------------------")
    if request.method == 'GET':
        return view_story(request)
    if request.method == 'POST':
        return create_story(request)
    if request.method == 'PUT':
        return update_story(request)
    if request.method == 'DELETE':
        return destroy_story(request)
def view_story(request):
    # board_id=request.GET.get("board",'')
    # board=Board.objects.get(id=int(board_id))
    # logging.info(dir(board))
    objs = Story.objects.all()
    data=[]
    for rec in objs:
        data.append(rec.json())
    output=data#{"total":total,"data":data}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def create_story(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    logging.info(data)
    rec=Story()
    # if data.get("channels")!=None:
    #     rec.channels=data.get("channels")
    rec.save()
    output={"success":True,"message":"Created new User" +str(rec.id)}
    output["data"]={"id":rec.id,"shenhe":rec.shenhe,"hetongbh":rec.hetongbh,"yiqibh":rec.yiqibh,"yiqixinghao":rec.yiqixinghao,"yujifahuo_date":rec.yujifahuo_date,"yonghu":rec.yonghu,"baoxiang":rec.baoxiang,"addr":rec.addr,"channels":rec.channels,"tiaoshi_date":rec.tiaoshi_date}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def update_story(request):
    data = json.loads(request.body.decode("utf-8"))#extjs read data from body
    id1=data.get("id")
    id1=int(id1)
    rec=Story.objects.get(id=id1)
    if data.get("hetongbh")!=None:
        rec.hetongbh=data["hetongbh"]
    if data.get("yujifahuo_date")!=None:
        dt=datetime.datetime.strptime(data["yujifahuo_date"],'%Y-%m-%d')
        rec.yujifahuo_date=dt.date()
    if data.get("yonghu")!=None:
        rec.yonghu=data.get("yonghu")
    if data.get("baoxiang")!=None:
        rec.baoxiang=data.get("baoxiang")
    if data.get("yiqixinghao")!=None:
        rec.yiqixinghao=data.get("yiqixinghao")
    if data.get("yiqibh")!=None:
        rec.yiqibh=data.get("yiqibh")
    if data.get("shenhe")!=None:
        rec.shenhe=data.get("shenhe")
    if data.get("addr")!=None:
        rec.addr=data.get("addr")
    if data.get("channels")!=None:
        rec.channels=data.get("channels")
    if data.get("tiaoshi_date")!=None:
        dt=datetime.datetime.strptime(data["tiaoshi_date"],'%Y-%m-%d')
        rec.tiaoshi_date=dt.date()
    rec.save()
    output={"success":True,"message":"update Story " +str(rec.id)}
    output["data"]={"id":rec.id,"shenhe":rec.shenhe,"hetongbh":rec.hetongbh,"yiqibh":rec.yiqibh,"yiqixinghao":rec.yiqixinghao,"yujifahuo_date":rec.yujifahuo_date,"yonghu":rec.yonghu,"baoxiang":rec.baoxiang,"addr":rec.addr,"channels":rec.channels,"tiaoshi_date":rec.tiaoshi_date}
    return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
def destroy_story(request):
    data = json.loads(request.body.decode("utf-8"))
    id=data.get("id")
    if id!=None:
        try:
            id1=int(id)
            rec=Story.objects.get(id=id1)
            rec.delete()
            output={"success":True,"message":"OK"}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
        except ObjectDoesNotExist as e:
            output={"success":False,"message":str(e)}
            return HttpResponse(json.dumps(output, ensure_ascii=False))
    else:
        output={"success":False,"message":"OK"}
        return HttpResponse(json.dumps(output, ensure_ascii=False))   
def stageOne(request,id=None):
    if request.method == 'GET':
        output=Stage.objects.get(id=int(id)).json()
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
    if request.method == 'DELETE':
        obj=Stage.objects.get(id=int(id))
        obj.delete()
        output=[]
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))                        
def storyOne(request,id=None):
    if request.method == 'GET':
        output=Story.objects.get(id=int(id)).json()
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))
    if request.method == 'DELETE':
        obj=Story.objects.get(id=int(id))
        obj.delete()
        output=[]
        return HttpResponse(json.dumps(output, ensure_ascii=False,cls=MyEncoder))                        