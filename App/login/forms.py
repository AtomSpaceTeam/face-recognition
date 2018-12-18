from django import forms

# class ResidentForm(forms.Form):
#     name = forms.CharField(label='Your name', max_length=100)
#     surname = forms.CharField(label='Your surname', max_length=100)
#     age = forms.IntegerField(label='Your age')
#     photo_1 = forms.FileField()
#     photo_2 = forms.FileField()
#     photo_3 = forms.FileField()
#     photo_4 = forms.FileField()
#     photo_5 = forms.FileField()

YEARS = [x for x in range(1980, 2005)]
class UserForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100)
    surname = forms.CharField(label='Your surname', max_length=100)
    status = forms.ChoiceField(label='Status', choices=(('resident', 'resident'), ('mentor', 'mentor'), ('owner', 'owner')))
    age = forms.IntegerField(label='Your age')
    date = forms.DateField(label='Your birth date', widget=forms.SelectDateWidget(years=YEARS))
    email = forms.EmailField(label='Your Email', max_length=50)
    profile_photo = forms.ImageField()
    photo_1 = forms.ImageField()
    photo_2 = forms.ImageField()
    photo_3 = forms.ImageField()
    photo_4 = forms.ImageField()
    photo_5 = forms.ImageField()

class EditForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=100)
    surname = forms.CharField(label='Your surname', max_length=100)
    status = forms.ChoiceField(label='Status', choices=(('resident', 'resident'), ('mentor', 'mentor'), ('owner', 'owner')))
    age = forms.IntegerField(label='Your age')
    date = forms.DateField(label='Your birth date', widget=forms.SelectDateWidget(years=YEARS))
    email = forms.EmailField(label='Your Email', max_length=50)