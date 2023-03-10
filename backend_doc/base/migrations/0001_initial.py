# Generated by Django 4.1.6 on 2023-02-06 07:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Clinic',
            fields=[
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('clinic_name', models.CharField(blank=True, max_length=200, null=True)),
                ('clinic_address', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('hospital_name', models.CharField(blank=True, max_length=200, null=True)),
                ('hospital_address', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('description', models.TextField(blank=True, null=True)),
                ('specialization', models.TextField(blank=True, null=True)),
                ('rating', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('numReviews', models.IntegerField(blank=True, default=0, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('rating', models.IntegerField(blank=True, default=0, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Lab',
            fields=[
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('lab_name', models.CharField(blank=True, max_length=200, null=True)),
                ('lab_address', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('product', models.ManyToManyField(related_name='labs', to='base.product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='HospitalFee',
            fields=[
                ('fees', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('HospitalFee_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('hospital_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hospitalfees', to='base.hospital')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hospitalfees', to='base.product')),
            ],
            options={
                'unique_together': {('product_id', 'hospital_id')},
            },
        ),
        migrations.AddField(
            model_name='hospital',
            name='product',
            field=models.ManyToManyField(related_name='hospitals', through='base.HospitalFee', to='base.product'),
        ),
        migrations.AddField(
            model_name='hospital',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Disease',
            fields=[
                ('disease_name', models.CharField(blank=True, max_length=200, null=True)),
                ('disease_symptoms', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('clinic', models.ManyToManyField(blank=True, related_name='diseases', to='base.clinic')),
                ('hospital', models.ManyToManyField(blank=True, related_name='diseases', to='base.hospital')),
                ('lab', models.ManyToManyField(blank=True, related_name='diseases', to='base.lab')),
                ('product', models.ManyToManyField(related_name='diseases', to='base.product')),
            ],
        ),
        migrations.AddField(
            model_name='clinic',
            name='product',
            field=models.ManyToManyField(related_name='clinic', to='base.product'),
        ),
        migrations.AddField(
            model_name='clinic',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='LabFee',
            fields=[
                ('fees', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('LabFee_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('lab_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='labfees', to='base.lab')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='labfees', to='base.product')),
            ],
            options={
                'unique_together': {('product_id', 'lab_id')},
            },
        ),
        migrations.CreateModel(
            name='ClinicFee',
            fields=[
                ('fees', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('ClinicFee_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('clinic_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clinicfees', to='base.clinic')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clinicfees', to='base.product')),
            ],
            options={
                'unique_together': {('product_id', 'clinic_id')},
            },
        ),
    ]
