from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    permission_classes,
    throttle_classes,
)
from .throttles import ChatRateThrottle

from recipes.serializers import RecipeSerializer

from .services import generate_recipe
from recipes.models import Recipe

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@throttle_classes([ChatRateThrottle])
def chat(request):
    ingredients = request.data.get("ingredients", [])

    recipe_text = generate_recipe(ingredients)

    title = "Untitled Recipe"

    for line in recipe_text.splitlines():
        if line.startswith("## "):
            title = line[2:].strip()
            break
    recipe = Recipe.objects.create(
            user=request.user,
            title=title,
            ingredients=", ".join(ingredients),
            recipe=recipe_text,
        )       

    return Response(RecipeSerializer(recipe).data)
