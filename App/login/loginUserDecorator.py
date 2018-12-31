def decorator(func):
    def wrapper():
        if request.session.user:
            func()
        else:
            return HttpResponeRedirect('/login-user')
    return wrapper