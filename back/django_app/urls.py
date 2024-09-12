from django.urls import path
from django_app import views

urlpatterns = [
    path("", view=views.home),
    #
    path("api", view=views.api),
    path("api/product", view=views.api_data),
]
