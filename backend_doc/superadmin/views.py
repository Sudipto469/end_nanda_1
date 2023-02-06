from django.shortcuts import render, redirect
from base.decorators import admin_required
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

# Create your views here.


@admin_required
def dashboard(request):
    print('SasCC')
    exit()


def admin_login(request):
    context = {}
    if request.user.is_authenticated:
        return redirect('dashboard')
    elif request.method == "POST":
        username = request.POST['email']
        password = request.POST['password']
        # user = AuthBackend.authenticate(
        #     request, username=username, password=password)
        user = authenticate(request, username=username, password=password)
        if user:
            if request.user.is_superuser == 1 and request.user.is_active == 1:
                login(request, request.user)
                return redirect('dashboard')
            else:
                messages.error(request, 'User is Not an admin.')
                return redirect('admin_login')
        else:
            messages.error(request, 'Please Provide Valid Credentials.')
            return redirect('admin_login')
    else:
        return render(request, "test.html", context)


def admin_logout(request):
    print('ascsaczacazc')
    exit()
