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
    path('create-event', views.create_event, name='create_event'),
    path('login/', auth_views.LoginView.as_view(template_name='login/index.html')),
    path('login-user/', views.login_user, name='login_user'),
    path('telegram-login/', views.telegram_login, name='telegram_login'),
    path('home-user', views.home_user, name='home_user'),
    path('users-user', views.list_users_user, name='users_user'),
    path('profile-user', views.profile_user, name='profile_user'),
    path('logout', views.logout, name='logout'),
    path('api-attendance', views.api_attendance, name='api_attendance'),
    path('recognised', views.recognised, name='recognised'),
    path('register', views.register, name='register'),
    path('create-guest', views.create_guest, name='create_guest'),
    path('api', views.login_user_api, name='api'),
    url(r'^user/(?P<pk>\d+)/$', views.user_profile, name='user_profile'),
    url(r'^user-users/(?P<pk>\d+)/$', views.profile_user, name='profile_user'),
    url(r'^event/(?P<pk>\d+)/$', views.event, name='event'),
    url(r'^user/(?P<pk>\d+)/edit$', views.edit_profile, name='edit_profile'),
    url(r'^user/(?P<pk>\d+)/delete$', views.delete_profile, name='delete_profile'),
    url(r'^event/(?P<pk>\d+)/edit$', views.edit_event, name='edit_event'),
    url(r'^event/(?P<pk>\d+)/delete$', views.delete_event, name='delete_event'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
