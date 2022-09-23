from django.apps import apps


def get_spam_prevention():
    return apps.get_app_config('api').spam_prevention


def get_redis():
    return apps.get_app_config('api').redis


def get_exchange_rate(currency):
    return apps.get_app_config('api').exchange_rates[currency]


def convert_currency_to_usd(currency, amount):
    rate_btc = currency['']
