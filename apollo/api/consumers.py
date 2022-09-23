from channels.generic.websocket import JsonWebsocketConsumer

from django.contrib.auth.models import AnonymousUser
from asgiref.sync import async_to_sync


class AppConsumer(JsonWebsocketConsumer):
    groups = ["ws-app"]

    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            self.groups[0],
            self.channel_name
        )

        try:
            self.accept()
        except Exception as ex:
            print('Error accepting connection ' + str(ex))

    def disconnect(self, close_code):
        print('Websocket disconnected: ' + str(close_code))
        pass
