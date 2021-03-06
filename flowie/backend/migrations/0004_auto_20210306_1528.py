# Generated by Django 3.1.4 on 2021-03-06 15:28

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_users_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='user_id',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=8, primary_key=True, serialize=False, unique=True),
        ),
    ]