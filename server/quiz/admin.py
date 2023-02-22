from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.Quizzes)
class QuizAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
    ]


@admin.register(models.Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ["title", "quiz", "answer_text"]


@admin.register(models.Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ["question", "answer_text", "user_name", "status"]
