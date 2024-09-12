from rest_framework import serializers
from django_app import models


class ProductSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"
