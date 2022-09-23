import requests

from django.apps import AppConfig
from django.conf import settings

from apollo.api.thread import threaded_timer
from apollo.api.module.spam_prevention import SpamPrevention
from apollo.api.store.redis import Redis


class ApiConfig(AppConfig):
    name = 'apollo.api'

    def __init__(self, app_name, app_module):
        super(ApiConfig, self).__init__(app_name, app_module)

        self.loaded = False
        self.spam_prevention = None
        self.redis = None
        self.api = None
        self.player_search = None
        self.ranks = None
        self.profile_handler = None
        self.staff = None
        self.leaderboards = None
        self.exchange_rates = None

    def ready(self):
        if not self.loaded:
            self.spam_prevention = SpamPrevention()

            self.redis = Redis()
            self.redis.load()

            threaded_timer.RepeatedTimer(15, self.fetch_exchange_rates)
            self.fetch_exchange_rates()

    def fetch_exchange_rates(self):
        api_response = requests.post('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,BNB,LTC,XRP,XMR,ETH,USDC&api_key=' + settings.CRYPTOCOMPARE_API_KEY)
        if api_response.status_code != 200:
            pass

        api_data = api_response.json()

        if self.exchange_rates is None:
            self.exchange_rates = {}

        for crypto_tag in api_data.keys():
            self.exchange_rates[crypto_tag] = api_data[crypto_tag]
