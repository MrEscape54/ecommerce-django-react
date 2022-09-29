import uuid
from django.db import models
from django.contrib.auth.models import UserManager, AbstractUser
from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _


class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model( email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        if extra_fields.get("is_active") is not True:
            raise ValueError("Superuser must have is_active=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    # Replace simple integer ID field with UUID
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Set email as required and unique
    email = models.EmailField(
        _("email address"), 
        unique=True, 
        help_text=_("Required"),error_messages={"unique": _("A user with this email already exists."),
        },
    )
    # Remove blank=True to set as required
    first_name = models.CharField(_("first name"), max_length=150)
    last_name = models.CharField(_("last name"), max_length=150)

    # Explicit the fields that will not be included in the database
    username = None

    # Set email as user.username
    USERNAME_FIELD = 'email'

    # Set required fields
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

