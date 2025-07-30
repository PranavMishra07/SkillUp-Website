


from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models

# ✅ 1. Custom user manager
class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')

        return self.create_user(email, password, **extra_fields)

#  2. Custom user model
class User(AbstractUser):
    ROLE_CHOICES = (
        ('learner', 'Learner'),
        ('instructor', 'Instructor'),
        ('admin', 'Admin'),
    )

    username = None  #  Disable username field
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='learner')
    is_verified = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)

    # 🛠️ Resolve reverse accessor clashes
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to.',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )

    USERNAME_FIELD = 'email'         # ✅ Now email is the unique identifier
    REQUIRED_FIELDS = []             # ✅ No username required

    objects = UserManager()          # ✅ Use custom manager

    def __str__(self):
        return self.email


# ✅ 3. OTP model (no change)
class EmailOTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    valid_until = models.DateTimeField()

    def __str__(self):
        return f"{self.user.email} - {self.otp}"