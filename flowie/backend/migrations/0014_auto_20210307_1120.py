# Generated by Django 3.1.4 on 2021-03-07 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_auto_20210307_1119'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='session_data',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
