import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from expenses.models import Category

def seed_categories():
    categories = ['Food', 'Travel', 'Rent', 'Utilities', 'Health', 'Entertainment', 'Education', 'Shopping', 'Savings']
    for name in categories:
        Category.objects.get_or_create(name=name)
    print("Categories seeded successfully!")

if __name__ == '__main__':
    seed_categories()
