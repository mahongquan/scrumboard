import requests
import json
def highest():
    url = "http://127.0.0.1:8000/api/v1/"
    doc = requests.get(url)
    print doc.content
def  xml():
    url = "http://127.0.0.1:8000/api/"
    params = {'format':'xml'}
    print requests.get(url,params=params).content
def  schema():
    url = "http://localhost:8000/api/board/schema/"
    params = {'format':'json'}
    print requests.get(url,params=params).content
def getall():
    url = "http://localhost:8000/api/board/"
    params = {'format':'json','limit':0}
    c= requests.get(url,params=params).content
    print c
    l=json.loads(c)
    all=l["objects"]
    for one in all:
        print one["id"],one["title"]
def newBoard():
    url = "http://localhost:8000/api/board/"
    postdata = {"collection": "/api/board/1/",'title': 'w1'} #urllib.urlencode([('q','python')])# urllib.urlencode({'value': 'v', 'result': 'r'})
    headers = {'content-type': 'application/json'}
    r=requests.post(url,data=json.dumps(postdata), headers=headers)
    #print dir(r)
    print r.status_code
    print r.reason
    #print r.headers
    open("res.html","w").write(r.text)
    c=r.text
    l=json.loads(c)
    print l["traceback"]
def deleteBoard(vid):
    url = "http://localhost:8000/api/board/"+str(vid)+"/"
    headers = {'content-type': 'application/json'}
    params = {'format':'json'}
    r=requests.delete(url,data=json.dumps(params), headers=headers)
    print r.status_code
    print r.reason
    print r.text 
if __name__=="__main__":
    # highest()
    # xml()
    # schema()
    # getbywtr()
    # print "getall==========================="
    getall()
    #newBoard()
    deleteBoard(3)
    #newCollection()
    #getContact("mahongquan")
