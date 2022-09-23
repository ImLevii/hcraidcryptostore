from django.http.response import JsonResponse

from apollo.api.helpers import utils


def spam_prevention(delay):
    def decorator(function):
        def wrapper(*args, **kwargs):
            request = args[0]

            if utils.get_spam_prevention().is_on_post_cooldown(request.user, delay):
                return JsonResponse({'error': 'spam prevention has blocked you from performing that action'})

            return function(*args, **kwargs)
        return wrapper

    return decorator
