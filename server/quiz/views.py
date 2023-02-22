from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Question, Quizzes, Submission
from .serializers import (
    QuizSerializer,
    RandomQuestionSerializer,
    QuestionSerializer,
    SubmissionSerializer,
)


# Create your views here.
class Quiz(generics.ListAPIView):

    serializer_class = QuizSerializer
    queryset = Quizzes.objects.all()


class GetQuestion(APIView):
    def get(self, request, format=None, **kwargs):
        question = Question.objects.filter(quiz__title=kwargs["topic"])
        serializer = RandomQuestionSerializer(question, many=True)
        return Response(serializer.data)


class CreateQuiz(generics.CreateAPIView):

    queryset = Quizzes.objects.all()
    serializer_class = QuizSerializer


class ListQuestion(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class CreateSubmission(generics.CreateAPIView):

    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer


class Submissions(APIView):
    def get(self, request, format=None, **kwargs):
        submissions = Submission.objects.filter(user_name=kwargs["userName"])
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data)
