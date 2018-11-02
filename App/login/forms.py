from django import forms

class ResidentForm(forms.Form):
    your_name = forms.CharField(label='Your name', max_length=100)
    your_surname = forms.CharField(label='Your surname', max_length=100)
    your_age = forms.IntegerField(label='Your age')