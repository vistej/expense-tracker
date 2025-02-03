from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import ExpenseSerializer, CategorySerializer, ExpenseCategorySerializer, ExpenseMonthlySerializer
from rest_framework.permissions import IsAuthenticated
from .models import Expense, Category
from django.db.models import Sum
from rest_framework.views import APIView
from django.db.models.functions import TruncMonth
from rest_framework.response import Response
from datetime import datetime

# Create your views here.

class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.all()

class ExpenseListCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        category_ids = self.request.query_params.get('category_ids')
        # TODO do you need to check the validity of the data? how?
        # TODO is it okay to write these constant values here?
        filters = {'created_by': user, 'date__range': (start_date, end_date)}

        if category_ids:
            filters['category_id_id__in'] = category_ids.split(',')
        return Expense.objects.filter(**filters)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(created_by=self.request.user)
        else:
            print(serializer.errors)
        
class ExpenseDelete(generics.DestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(created_by=user)

class ExpenseUpdate(generics.UpdateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(created_by=user)
    
    
class ExpenseByCategory(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        expenses = (
                    Expense.objects.filter(created_by=user)
                    .annotate(month=TruncMonth('created_at'))
                    .values('category_id', 'month')
                    .annotate(total_cost=Sum('cost'))
                    .order_by('category_id', 'month')
                )
        serializer = ExpenseCategorySerializer(expenses, many=True)
        return Response(serializer.data)

class ExpenseMonthly(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        expenses = (
                    Expense.objects.filter(created_by=user)
                    .annotate(month=TruncMonth('created_at'))
                    .values('month')
                    .annotate(total_cost=Sum('cost'))
                    .order_by('month')
                )
        serializer = ExpenseMonthlySerializer(expenses, many=True)
        return Response(serializer.data)
        