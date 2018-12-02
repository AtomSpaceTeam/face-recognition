from django.urls import path
from django.conf.urls.static import static
from . import views
from django.contrib.auth.views import LoginView
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    path('', views.index, name='index'),
    path('residents', views.list_residents, name='list_residents'),
    path('mentors', views.list_mentors, name='list_mentors'),
    path('owners', views.list_owners, name='list_owners'),
    path('camera', views.online_camera, name='online_camera'),
    path('login/', auth_views.LoginView.as_view(template_name='login/login.html')),
    path('logout', views.logout, name='logout'),
    path('test', views.test, name='test'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)