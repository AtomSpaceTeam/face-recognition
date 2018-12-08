from django import forms

class ResidentForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100)
    surname = forms.CharField(label='Your surname', max_length=100)
    age = forms.IntegerField(label='Your age')
    photo_1 = forms.FileField()
    photo_2 = forms.FileField()
    photo_3 = forms.FileField()
    photo_4 = forms.FileField()
    photo_5 = forms.FileField()

class UserForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100)
    surname = forms.CharField(label='Your surname', max_length=100)
    age = forms.IntegerField(label='Your age')
    status = forms.ChoiceField(label='Status', choices=(('resident', 'resident'), ('mentor', 'mentor'), ('owner', 'owner')))
    profile_photo = forms.FileField()
    photo_1 = forms.FileField()
    photo_2 = forms.FileField()
    photo_3 = forms.FileField()
    photo_4 = forms.FileField()
    photo_5 = forms.FileField()