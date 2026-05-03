from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from django.shortcuts import get_object_or_404

class TaskView(APIView):
    def post(self, request):
        
        serializer = TaskSerializer(data=request.data)
    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors)
    def get(self, request, id=None):
        if id:
            task = get_object_or_404(Task, id=id)
            serializer = TaskSerializer(task)
            return Response(serializer.data)
    
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    #def put(self, request, id):
    #    
    #    task = get_object_or_404(Task, id=id)
    #    serializer = TaskSerializer(task, data=request.data)
    #
    #    if serializer.is_valid():
    #        serializer.save()
    #        return Response(serializer.data)
    #
    #    return Response(serializer.errors)
    
    def patch(self, request, id):
        
        task = get_object_or_404(Task, id=id)
        serializer = TaskSerializer(task, data=request.data, partial=True)
    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    
        return Response(serializer.errors)
    def delete(self, request, id):
        
        task = get_object_or_404(Task, id=id)
        task.delete()
        return Response({"message": "Task deleted successfully"})