from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, throttle_classes
from api.throttles import RegisterRateThrottle,LoginRateThrottle
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


@api_view(["POST"])
@throttle_classes([RegisterRateThrottle])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {"message": "User created successfully"},
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(TokenObtainPairView):
    throttle_classes = [LoginRateThrottle]