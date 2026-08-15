from rest_framework.throttling import UserRateThrottle,AnonRateThrottle


class ChatRateThrottle(UserRateThrottle):
    scope = "chat"


class LoginRateThrottle(AnonRateThrottle):
    scope = "login"


class RegisterRateThrottle(AnonRateThrottle):
    scope = "register"
