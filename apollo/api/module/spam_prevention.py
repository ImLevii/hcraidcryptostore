from django.utils import timezone


class SpamPrevention:
    post_cooldowns = {}
    interact_cooldowns = {}

    def is_on_post_cooldown(self, user_id):
        now = timezone.now().timestamp() * 1000.0
        if user_id in self.post_cooldowns:
            if now - self.post_cooldowns[user_id]['LastSubmit'] < self.post_cooldowns[user_id]['Delay']:
                return True
        return False

    def apply_post_cooldown(self, user_id, delay):
        self.post_cooldowns[user_id] = {'LastSubmit': (timezone.now().timestamp() * 1000.0), 'Delay': delay}

    def is_on_interact_cooldown(self, user_id):
        now = timezone.now().timestamp() * 1000.0
        if user_id in self.interact_cooldowns:
            if now - self.interact_cooldowns[user_id]['LastSubmit'] < self.interact_cooldowns[user_id]['Delay']:
                return True
        return False

    def apply_interact_cooldown(self, user_id, delay):
        self.interact_cooldowns[user_id] = {'LastSubmit': (timezone.now().timestamp() * 1000.0), 'Delay': delay}
