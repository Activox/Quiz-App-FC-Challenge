from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Quizzes(models.Model):
    class Meta:
        verbose_name = _("Quiz")
        verbose_name_plural = _("Quizzes")
        ordering = ["id"]

    title = models.CharField(
        max_length=255, default=_("New Quiz"), verbose_name=_("Quiz Title")
    )
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Updated(models.Model):
    date_updated = models.DateTimeField(verbose_name=_("Last Updated"), auto_now=True)

    class Meta:
        abstract = True


class Question(Updated):
    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")
        ordering = ["id"]

    quiz = models.ForeignKey(Quizzes, related_name="question", on_delete=models.PROTECT)
    title = models.CharField(max_length=255, verbose_name=_("Title"))
    answer_text = models.CharField(max_length=255, verbose_name=_("Answer Text"))
    date_created = models.DateTimeField(
        auto_now_add=True, verbose_name=_("Date Created")
    )

    objects = models.Manager()  # add the default manager

    def __str__(self):
        return self.title


class Submission(Updated):
    class Meta:
        verbose_name = _("Submission")
        verbose_name_plural = _("Submissions")
        ordering = ["id"]

    question = models.ForeignKey(
        Question, related_name="submission", on_delete=models.PROTECT
    )
    answer_text = models.CharField(max_length=255, verbose_name=_("Answer Text"))
    user_name = models.CharField(max_length=255, verbose_name=_("User Name"))
    status = models.CharField(max_length=255, verbose_name=_("Status"))

    def __str__(self):
        return self.user_name
