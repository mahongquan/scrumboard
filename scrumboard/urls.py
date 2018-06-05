from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path
admin.autodiscover()

urlpatterns = [
    # scrumboard urls
    url(r'^', include('scrumboard.board.urls')),
    path('admin/', admin.site.urls),
    # auth
    # url(r'^auth/', include('auth.urls')),

    # admin
    # url(r'^admin/', include(admin.site.urls)),
]
urlpatterns += staticfiles_urlpatterns()
