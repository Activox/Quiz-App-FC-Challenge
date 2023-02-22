from rest_framework import serializers
from .models import Quizzes, Question, Submission


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizzes
        fields = ["id", "title"]


class RandomQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            "id",
            "quiz",
            "title",
            "answer_text",
        ]


class QuestionSerializer(serializers.ModelSerializer):
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quizzes.objects.all())
    title = serializers.CharField()
    answer_text = serializers.CharField()

    class Meta:
        model = Question
        fields = [
            "id",
            "quiz",
            "title",
            "answer_text",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["quiz"] = QuizSerializer(instance.quiz).data
        return data


class SubmissionSerializer(serializers.ModelSerializer):

    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    user_name = serializers.CharField()
    answer_text = serializers.CharField()
    status = serializers.BooleanField()

    class Meta:
        model = Submission
        fields = ["question", "answer_text", "user_name", "status"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["question"] = QuestionSerializer(instance.question).data
        return data
