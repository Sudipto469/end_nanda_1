# Generated by Django 4.1.1 on 2022-12-27 23:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="hospitalfee", old_name="id", new_name="HospitalFee_id",
        ),
    ]