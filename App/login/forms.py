from django import forms

class ResidentForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100)
    surname = forms.CharField(label='Your surname', max_length=100)
    age = forms.IntegerField(label='Your age')
    # photo_1 = forms.FileField()