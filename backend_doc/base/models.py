from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager


# Create your models here.
'''
This stores the doctors 
'''

class User(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=155,
        unique=True,
        error_messages={'unique': 'A user with that email already exists.'},
        help_text='Required. 150 characters or fewer. Letters, digits and @/./_ only.',
    )
    pswd_token = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    USERNAME_FIELD = 'email'
    # removes email from REQUIRED_FIELDS
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone']

    manager = UserManager()

    def __str__(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_superuser


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='Product/', null=True, blank=True,
                              default='/placeholder.png')
    description = models.TextField(null=True, blank=True)
    specialization = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    class Meta:
        managed = True


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Hospital(models.Model):
    # fees = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ManyToManyField(
        Product, related_name='hospitals', through='HospitalFee')
    image = models.ImageField(upload_to='Hospital/', null=True, blank=True,
                              default='/placeholder.png')
    hospital_name = models.CharField(max_length=200, null=True, blank=True)
    hospital_address = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.hospital_name)


class Lab(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ManyToManyField(Product, related_name='labs')
    image = models.ImageField(upload_to='Lab/', null=True, blank=True,
                              default='/placeholder.png')
    lab_name = models.CharField(max_length=200, null=True, blank=True)
    lab_address = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.lab_name)


class Clinic(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ManyToManyField(Product, related_name='clinic')
    image = models.ImageField(upload_to='Clinic/', null=True, blank=True,
                              default='/placeholder.png')
    clinic_name = models.CharField(max_length=200, null=True, blank=True)
    clinic_address = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.clinic_name)


class Disease(models.Model):
    product = models.ManyToManyField(Product, related_name='diseases')
    hospital = models.ManyToManyField(
        Hospital, blank=True, related_name='diseases')
    lab = models.ManyToManyField(Lab, blank=True, related_name='diseases')
    clinic = models.ManyToManyField(
        Clinic, blank=True, related_name='diseases')
    disease_name = models.CharField(max_length=200, null=True, blank=True)
    disease_symptoms = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.disease_name)


class HospitalFee(models.Model):
    product_id = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="hospitalfees")
    hospital_id = models.ForeignKey(
        Hospital, on_delete=models.CASCADE, related_name="hospitalfees")
    fees = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    HospitalFee_id = models.AutoField(primary_key=True, editable=False)

    @property
    def id(self):
        return self.product_id.id

    @property
    def name(self):
        return self.product_id.name

    @property
    def specialization(self):
        return self.product_id.specialization

    @property
    def hospital_name(self):
        return self.hospital_id.hospital_name

    @property
    def hospital_address(self):
        return self.hospital_id.hospital_address

    class Meta:
        unique_together = [['product_id', 'hospital_id']]

    def __str__(self):
        return str(self.fees)


class ClinicFee(models.Model):
    product_id = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="clinicfees")
    clinic_id = models.ForeignKey(
        Clinic, on_delete=models.CASCADE, related_name="clinicfees")
    fees = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    ClinicFee_id = models.AutoField(primary_key=True, editable=False)

    @property
    def id(self):
        return self.product_id.id

    @property
    def name(self):
        return self.product_id.name

    @property
    def specialization(self):
        return self.product_id.specialization

    @property
    def clinic_name(self):
        return self.clinic_id.clinic_name

    @property
    def clinic_address(self):
        return self.clinic_id.clinic_address

    class Meta:
        unique_together = [['product_id', 'clinic_id']]

    def __str__(self):
        return str(self.fees)


class LabFee(models.Model):
    product_id = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="labfees")
    lab_id = models.ForeignKey(
        Lab, on_delete=models.CASCADE, related_name="labfees")
    fees = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    LabFee_id = models.AutoField(primary_key=True, editable=False)

    @property
    def id(self):
        return self.product_id.id

    @property
    def name(self):
        return self.product_id.name

    @property
    def specialization(self):
        return self.product_id.specialization

    @property
    def lab_name(self):
        return self.lab_id.lab_name

    @property
    def lab_address(self):
        return self.lab_id.lab_address

    class Meta:
        unique_together = [['product_id', 'lab_id']]

    def __str__(self):
        return str(self.fees)
