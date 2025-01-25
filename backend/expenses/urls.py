from django.urls import path
from . import views

urlpatterns = [
    path("categories/", views.CategoryList.as_view(), name="category-list"),
    path("expenses/", views.ExpenseListCreate.as_view(), name="expense-list"),
    path("expenses/delete/<int:pk>/", views.ExpenseDelete.as_view(), name="expense-delete"),
    path("expenses/update/<int:pk>/", views.ExpenseUpdate.as_view(), name="expense-update"),
    path("expenses/aggregations/category/", views.ExpenseByCategory.as_view(), name="expense-by-category"),
]