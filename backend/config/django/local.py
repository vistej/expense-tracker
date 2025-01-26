from .base import *

DEBUG = True
ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS', default=[''])