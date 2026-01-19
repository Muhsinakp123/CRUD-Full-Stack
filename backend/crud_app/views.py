from rest_framework.viewsets import ModelViewSet
from .models import Task
from .serializer import TaskSerializer

# Create your views here.

class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
