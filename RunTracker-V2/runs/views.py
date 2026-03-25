from rest_framework import viewsets
from .models import Run
from .serializers import RunSerializer


# Create your views here.


class RunViewSet(viewsets.ModelViewSet):
    queryset = Run.objects.all()
    serializer_class = RunSerializer