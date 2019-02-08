# Generated by Django 2.1.3 on 2019-01-28 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
                ('description', models.TextField()),
                ('organizer', models.CharField(max_length=40)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('created_time', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Guest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('surname', models.CharField(max_length=40)),
                ('email', models.EmailField(max_length=60)),
                ('event_id', models.IntegerField()),
                ('photo', models.ImageField(upload_to='guest_photos')),
            ],
        ),
        migrations.CreateModel(
            name='Seen',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('status', models.CharField(max_length=20)),
                ('time', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attendance', models.IntegerField(default=None)),
                ('name', models.CharField(max_length=30)),
                ('surname', models.CharField(max_length=30)),
                ('username', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=150)),
                ('status', models.CharField(max_length=15)),
                ('birth_date', models.DateTimeField()),
                ('email', models.EmailField(max_length=30, null=True)),
                ('specialization', models.CharField(max_length=30)),
                ('team', models.CharField(max_length=50)),
                ('project', models.CharField(max_length=50)),
                ('last_seen', models.DateTimeField(auto_now=True)),
                ('profile_photo', models.ImageField(upload_to='profile_photos')),
            ],
        ),
    ]
