from django.urls import path
from django.conf.urls import url
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
    path('users', views.list_users, name='list_users'),
    path('events', views.list_events, name='list_events'),
    path('create_event', views.create_event, name='create_event'),
    path('login/', auth_views.LoginView.as_view(template_name='login/index.html')),
    path('login-user/', views.login_user, name='login_user'),
    path('home-user', views.home_user, name='home_user'),
    path('logout', views.logout, name='logout'),
    path('create_user', views.create_user, name='create_user'),
    url(r'^user/(?P<pk>\d+)/$', views.user_profile, name='user_profile'),
    url(r'^user/(?P<pk>\d+)/edit$', views.edit_profile, name='edit_profile'),
    url(r'^user/(?P<pk>\d+)/delete$', views.delete_profile, name='delete_profile'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)