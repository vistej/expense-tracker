from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Expense, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['id', 'name']

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'
        read_only_fields = ['id', 'created_by', 'created_at']

class ExpenseCategorySerializer(serializers.Serializer):
    category_id = serializers.IntegerField()
    month = serializers.DateTimeField()
    total_cost = serializers.DecimalField(max_digits=20, decimal_places=2)


class ExpenseMonthlySerializer(serializers.Serializer):
    month = serializers.DateTimeField()
    total_cost = serializers.DecimalField(max_digits=20, decimal_places=2)

