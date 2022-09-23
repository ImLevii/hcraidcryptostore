from functools import wraps

from django.conf import settings
from django.http import HttpResponse

import requests
import json


def check_recaptcha(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not settings.GOOGLE_RECAPTCHA_ENABLED:
            return view_func(request, *args, **kwargs)

        request.recaptcha_is_valid = None
        request_data = json.loads(request.body)

        if request.method == 'POST':
            if 'recaptchaToken' not in request_data:
                return HttpResponse(content='Bad request', status=403)

            recaptcha_token = request_data['recaptchaToken']

            post_data = {
                'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
                'response': recaptcha_token
            }

            verify_response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=post_data).json()

            if not verify_response['success']:
                return HttpResponse(content='Captcha is invalid', status=403)

        return view_func(request, *args, **kwargs)

    return _wrapped_view
