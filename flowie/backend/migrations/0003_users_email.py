# Generated by Django 3.1.4 on 2021-03-06 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20210305_1908'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='email',
            field=models.EmailField(max_length=20, null=True),
        ),
    ]
