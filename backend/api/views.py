from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .services import generate_recipe

@api_view(["POST"])
def chat(request):
    ingredients  = request.data.get("ingredients",[])

    return Response({
        "recipe" : generate_recipe(ingredients)
    })

