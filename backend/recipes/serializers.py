from rest_framework import serializers
from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = [
            "id",
            "title",
            "ingredients",
            "recipe",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
        ]