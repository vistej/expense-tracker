import os
import django
from config.env import env

os.environ.setdefault('DJANGO_SETTINGS_MODULE', env('DJANGO_SETTINGS_MODULE', default='config.django.prod'))
django.setup()

from expenses.models import Category

def seed_categories():
    categories = ['Food', 'Travel', 'Rent', 'Utilities', 'Health', 'Entertainment', 'Education', 'Shopping', 'Savings', 'Others']
    for name in categories:
        Category.objects.get_or_create(name=name)
    print("Categories seeded successfully!")

if __name__ == '__main__':
    seed_categories()
