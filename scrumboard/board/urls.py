from django.conf.urls import include, url
from scrumboard.board import views
urlpatterns = [
    url(r'^$', views.app, name='dashboard'),
    url(r'^board$',views.board),
    url(r'^board/(?P<id>\d+)$', views.boardOne),
    url(r'^home',views.home),
    url(r'^stage$',views.stage),
    url(r'^stage/(?P<id>\d+)$', views.stageOne),
    url(r'^story$',views.story),
    url(r'^story/(?P<id>\d+)$', views.storyOne),
]
