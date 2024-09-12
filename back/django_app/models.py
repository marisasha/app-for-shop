from django.db import models


class Product(models.Model):

    title = models.CharField(
        verbose_name="Название",
        unique=True,
        null=False,
        blank=True,
        db_index=True,
        max_length=60,
    )

    description = models.TextField(
        verbose_name="Описание",
        unique=False,
        null=False,
        blank=True,
        db_index=True,
    )

    price = models.PositiveIntegerField(
        verbose_name="Цена",
        unique=False,
        null=False,
        blank=True,
        db_index=True,
    )

    class Meta:
        app_label = "django_app"
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"

    def __str__(self):
        return f"<Product [{self.id}] {self.title}/>"
