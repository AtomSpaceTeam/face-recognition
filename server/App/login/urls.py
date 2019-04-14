from django.urls import path
from django.conf.urls import url
from django.conf.urls.static import static
from . import views
from django.contrib.auth.views import LoginView
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    # -------------------- FOR REST API --------------------
    path('', views.index, name='index'),
    path('api/v1/set-pass', views.set_pass, name='set_pass'),
    path('api/v1/check', views.check, name='check'),
    path('api/v1/count', views.count, name='count'),
    path('api/v1/user-info', views.user_info, name='user_info'),
    path('api/v1/users', views.users, name='users'),
    path('api/v1/attendance', views.api_attendance, name='api_attendance'),
    path('api/v1/login', views.login_user_api, name='api'),
    path('api/v1/create-user', views.create_user, name='create_user'),
    path('api/v1/create-event', views.create_event, name='create_event'),
    path('api/v1/create-guest', views.create_guest, name='create_guest'),
    path('api/v1/get-usernames', views.get_usernames, name='get_usernames'),
    path('api/v1/get-events', views.events, name='events'),
    url(r'^api/v1/delete-user/(?P<pk>\d+)$', views.delete_user, name='delete_user'),
    url(r'^api/v1/delete-event/(?P<pk>\d+)$', views.delete_event, name='delete_event'),
    url(r'api/v1/get-guests/(?P<event_id>\d+)$', views.get_guests, name='get_guests'),

    # -------------------- FOR DJANGO TEMPLATES --------------------
    path('residents', views.list_residents, name='list_residents'),
    path('mentors', views.list_mentors, name='list_mentors'),
    path('owners', views.list_owners, name='list_owners'),
    path('users_list', views.list_users, name='list_users'),
    path('create-event', views.create_eventt, name='create_eventt'),
    path('login/', auth_views.LoginView.as_view(template_name='login/index.html')),
    path('login-user/', views.login_user, name='login_user'),
    path('telegram-login/', views.telegram_login, name='telegram_login'),
    path('home-user', views.home_user, name='home_user'),
    path('users-user', views.list_users_user, name='users_user'),
    path('profile-user', views.profile_user, name='profile_user'),
    path('logout', views.logout, name='logout'),
    path('recognised', views.recognised, name='recognised'),
    path('register', views.register, name='register'),
    path('create-guest', views.create_guestt, name='create_guestt'),
    url(r'^user/(?P<pk>\d+)/$', views.user_profile, name='user_profile'),
    url(r'^user-users/(?P<pk>\d+)/$', views.profile_user, name='profile_user'),
    url(r'^event/(?P<pk>\d+)/$', views.event, name='event'),
    url(r'^user/(?P<pk>\d+)/edit$', views.edit_profile, name='edit_profile'),
    url(r'^user/(?P<pk>\d+)/delete$', views.delete_profile, name='delete_profile'),
    url(r'^event/(?P<pk>\d+)/edit$', views.edit_event, name='edit_event'),
    url(r'^event/(?P<pk>\d+)/delete$', views.remove_event, name='remove_event'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
