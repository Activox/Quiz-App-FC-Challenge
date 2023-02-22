from django.urls import path
from .views import (
    Quiz,
    GetQuestion,
    ListQuestion,
    CreateQuiz,
    Submissions,
    CreateSubmission,
)

app_name = "quiz"

urlpatterns = [
    path("", Quiz.as_view(), name="quiz"),
    path("create/", CreateQuiz.as_view(), name="createquiz"),
    path("randomQuestion/<str:topic>/", GetQuestion.as_view(), name="random"),
    path("create/question/", ListQuestion.as_view(), name="createquestion"),
    path("create/submission/", CreateSubmission.as_view(), name="createsubmission"),
    path("submissions/<str:userName>/", Submissions.as_view(), name="submissions"),
]
