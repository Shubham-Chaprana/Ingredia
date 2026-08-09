from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Recipe
from .serializers import RecipeSerializer


class RecipeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        recipes = Recipe.objects.filter(user=request.user)
        serializer = RecipeSerializer(recipes, many=True)

        return Response(serializer.data)

class RecipeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            recipe = Recipe.objects.get(
                pk=pk,
                user=request.user
            )
        except Recipe.DoesNotExist:
            return Response(
                {"detail": "Recipe not found."},
                status=404
            )

        serializer = RecipeSerializer(recipe)

        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            recipe = Recipe.objects.get(
                pk=pk,
                user=request.user
            )
        except Recipe.DoesNotExist:
            return Response(
                {"detail": "Recipe not found."},
                status=404
            )

        recipe.delete()

        return Response(status=204)