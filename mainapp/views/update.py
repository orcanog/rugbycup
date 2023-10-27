from django import forms
from django.views.generic import FormView
from django.urls import reverse_lazy
from django.db import connection
from django.contrib.auth import authenticate

from mainapp.models import Newsletter

class UpdateForm(forms.Form):
    adminuser = forms.CharField(label="Nom d'utilisateur")
    adminpassword = forms.CharField(label="Mot de passe", widget=forms.PasswordInput)
    email = forms.EmailField(label="E-mail de l'inscrit", help_text="Cet e-mail sera utilisé pour retrouver l'inscrit dans la base.")
    name = forms.CharField(label="Nom de l'inscrit")
    consent = forms.BooleanField(label="Consentement de l'inscrit", required=False)

class UpdateView(FormView):
    template_name = "update.html"
    form_class = UpdateForm
    success_url = reverse_lazy('home')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    # Cette fonction est appelée lorsque le formulaire est invalide
    def form_invalid(self, form, **kwargs):
        context = self.get_context_data(**kwargs)
        # On se sert du contexte pour faire passer un message d'erreur
        context["alert"] = "Le formulaire est incomplet ou incorrect."
        # On utilise la fonction "shortcut" render_to_response pour renvoyer à nouveau cette page
        return self.render_to_response(context)

    # Cette fonction est appelée lorsque le formulaire est valide
    def form_valid(self, form):
        # Récupération des valeurs de chaque champ du formulaire
        adminuser = form.cleaned_data["adminuser"]
        adminpassword = form.cleaned_data["adminpassword"]
        email = form.cleaned_data["email"]
        name = form.cleaned_data["name"]
        consent = form.cleaned_data["consent"]

        # Utilisation du système d'authentification de Django
        user = authenticate(username=adminuser, password=adminpassword)

        # Si aucun utilisateur est renvoyé, c'est que l'authentification a échouée
        if user is None:
            context = self.get_context_data()
            context["alert"] = "Impossible de se connecter en tant qu'administrateur du site web."
            return self.render_to_response(context)

        # On essaye de mettre à jour les informations de la BDD
        has_updated = self.db_update_subscriber(email, name, consent)

        # Lorsque la recherche d'une ligne avec cet email n'a rien renvoyé
        if not has_updated:
            context = self.get_context_data()
            context["alert"] = "Cette adresse e-mail n'est pas inscrite à la newsletter."
            return self.render_to_response(context)

        # On ajoute un message temporaire dans notre session
        self.request.session["homemessage"] = "Données personnelles modifiées avec succès."

        # On laisse la méthode d'origine renvoyer une réponse HTTP
        return super().form_valid(form)

    # Ajoute un nouvel inscrit dans la base de données
    def db_update_subscriber(self, email, name, consent):
        if not Newsletter.objects.filter(email=email).exists():
            return False
        
        existing_subscriber = Newsletter(email=email, name=name, consent=consent)
        existing_subscriber.save(force_update=True)
        return True
