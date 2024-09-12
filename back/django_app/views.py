from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from django.db.models import QuerySet
from django_app import models, serializers
from django.views.decorators.csrf import csrf_exempt


def home(request: HttpRequest) -> HttpResponse:
    return render(request, "index.html", context={})


@api_view(http_method_names=["GET"])
@permission_classes([AllowAny])
def api(request: Request) -> Response:
    return Response(data={"message": "ok"}, status=status.HTTP_200_OK)


@api_view(http_method_names=["GET", "POST"])
@permission_classes([AllowAny])
def api_data(request: Request) -> Response:
    if request.method == "GET":
        raw_data = models.Product.objects.all()
        serilized_data = serializers.ProductSimpleSerializer(
            raw_data, many=True if isinstance(raw_data, QuerySet) else False
        ).data
        return Response(data={"data": serilized_data}, status=status.HTTP_200_OK)
    if request.method == "POST":
        try:
            title = str(request.data.get("title", None))
            description = str(request.data.get("description", None))
            price = int(request.data.get("price", None))
            if title is None or description is None or price is None:
                return Response(
                    data={"message": "Данные введены не полностью"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            if title == "" or description == "":
                return Response(
                    data={"message": "Данные введены не полностью"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            if price < 0:
                return Response(
                    data={"message": "Цена не может быть отрицательной или нулевой"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            models.Product.objects.create(
                title=title.capitalize(),
                description=description.capitalize(),
                price=price,
            )
            return Response(data={"message": "ok"}, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            # не следует показывать точные ошибки back'a
            return Response(
                data={"message": "Ошибка"}, status=status.HTTP_404_NOT_FOUND
            )
