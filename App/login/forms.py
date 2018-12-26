from django import forms


spec = (
    ('Software Developer', 'Software Developer'),
    ('Designer', 'Designer'),
    ('Front End', 'Front End'),
    ('Back End', 'Back End'),
    ('Other', 'Other')
)

YEARS = [x for x in range(1980, 2005)]
class UserForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100)
    surname = forms.CharField(label='Your surname', max_length=100)
    username = forms.CharField(label='Your username', max_length=50)
    password = forms.CharField(widget=forms.PasswordInput())
    password_1 = forms.CharField(label='Confirm password', widget=forms.PasswordInput())
    status = forms.ChoiceField(label='Status', choices=(('resident', 'resident'), ('mentor', 'mentor'), ('owner', 'owner')))
    date = forms.DateField(label='Your birth date', widget=forms.SelectDateWidget(years=YEARS))
    email = forms.EmailField(label='Your Email', max_length=50)
    specialization = forms.ChoiceField(label='Specialization', choices=spec)
    team = forms.CharField(label='Your team (optional)', max_length=50)
    project = forms.CharField(label='Your project (optional)', max_length=50)
    profile_photo = forms.ImageField()

class EditForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100)
    surname = forms.CharField(label='Your surname', max_length=100)
    status = forms.ChoiceField(label='Status', choices=(('resident', 'resident'), ('mentor', 'mentor'), ('owner', 'owner')))
    age = forms.IntegerField(label='Your age')
    date = forms.DateField(label='Your birth date', widget=forms.SelectDateWidget(years=YEARS))
    email = forms.EmailField(label='Your Email', max_length=50)

class UserLogin(forms.Form):
    username = forms.CharField(label='', max_length=40, widget=forms.TextInput(attrs={'class': 'inputs login-input', 'placeholder': 'Username'}))
    password = forms.CharField(label='', max_length=40, widget=forms.PasswordInput(attrs={'class': 'inputs password-input', 'placeholder': 'Password'}))

class EventForm(forms.Form):
    name = forms.CharField(label='Name of event', max_length=80, widget=forms.TextInput(attrs={'class': 'input-group-text'}))
    description = forms.CharField(widget=forms.Textarea(attrs={'class': 'input-group-text', 'wrap': 'hard', 'rows': '4'}), label='Description')
    organizer = forms.CharField(label='Organizer', max_length=80, widget=forms.TextInput(attrs={'class': 'input-group-text'}))
    start_date = forms.CharField(widget=forms.DateTimeInput(attrs={'type': 'date', 'class': 'input-group-text'}), label='Start time')
    start_time = forms.CharField(widget=forms.DateTimeInput(attrs={'type': 'time', 'class': 'input-group-text'}), label='')
    end_date = forms.CharField(widget=forms.DateTimeInput(attrs={'type': 'date', 'class': 'input-group-text'}), label='End time')
    end_time = forms.CharField(widget=forms.DateTimeInput(attrs={'type': 'time', 'class': 'input-group-text'}), label='')