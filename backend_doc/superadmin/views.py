from django.shortcuts import render, redirect
from base.decorators import admin_required, login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from base import models

# Create your views here.


@admin_required
def dashboard(request):
    context = {}
    return render(request, 'admin/dashboard.html', context)


def admin_login(request):
    context = {}
    if request.user.is_authenticated:
        return redirect('admin:dashboard')
    elif request.method == "POST":
        username = request.POST['email']
        password = request.POST['password']
        # user = AuthBackend.authenticate(
        #     request, username=username, password=password)
        user = authenticate(request, username=username, password=password)
        if user:
            if user.is_superuser == 1 and user.is_active == 1:
                login(request, user)
                return redirect('admin:dashboard')
            else:
                messages.error(request, 'User is Not an admin.')
                return redirect('admin:admin_login')
        else:
            messages.error(request, 'Please Provide Valid Credentials.')
            return redirect('admin:admin_login')
    else:
        return render(request, "admin/admin_login.html", context)


@login_required
def admin_logout(request):
    logout(request)
    try:
        del request.session
    except:
        pass
    try:
        storage = messages.get_messages(request)
        for message in storage:
            message = ''
        storage.used = False
    except:
        pass
    messages.warning(request, 'Logout Successfully.')
    return redirect('admin:admin_login')


@login_required
def labList(request):
    page = request.GET.get('page', 1)
    labs = models.Lab.objects.all()
    if request.user.is_superuser == False:
        labs = labs.filter(user_id=request.user.id)
    # paginator = Paginator(labs, env("PER_PAGE_DATA"))
    # labs = paginator.page(page)
    context = {'labs': labs}
    return render(request, 'admin/lab/list.html', context)
