from django.db import models
from django.contrib.auth.models import User
from .constants import RECUR_OPTIONS
from django.utils.timezone import now
# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Expense(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses')
    item_name = models.CharField(max_length=100)
    category_id = models.ForeignKey('Category', on_delete=models.CASCADE)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=now)
    description = models.TextField(null=True, blank=True)
    recurring = models.BooleanField(default=now)
    recurrence_period = models.CharField(choices=RECUR_OPTIONS, default=None, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.item_name} - ${self.cost}"

    class Meta:
        ordering = ['-date']
