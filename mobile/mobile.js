const eventsContainer = document.querySelector('#events');

window.addEventListener('load', function () {

    // Appel API avec fetch
    fetch("http://localhost:8000/api/events")

    // Récupération des données et conversion en JSON
    .then(response => response.json())

    // Traitement des données
    .then(data => {
    
        // Création d'une variable pour stocker les données de l'API
        const eventsData = data.events;

        // Création des éléments HTML pour chaque élément contenu dans la variable eventsData
        eventsData.forEach((item) => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');

            const eventStadium = document.createElement('p');
            eventStadium.classList.add('event-stadium');
            eventStadium.textContent = `${item.stadium.name} - ${item.stadium.location}`;

            const eventDate = document.createElement('p');
            eventDate.classList.add('event-date');
            eventDate.textContent = `${item.start}`;

            const eventDivTeams = document.createElement('div');
            eventDivTeams.classList.add('event-teams');

            const eventTitle = document.createElement('p');
            eventTitle.classList.add('event-title');
            eventTitle.textContent = `${item.team_home?.country ?? "-"} vs ${item.team_away?.country ?? "-"}`;

            // Ajouts à la div event
            eventDiv.appendChild(eventStadium);
            eventDiv.appendChild(eventDate);
            eventDivTeams.appendChild(eventTitle);
            eventDiv.appendChild(eventDivTeams);

            // Ajout au conteneur d'événements
            eventsContainer.appendChild(eventDiv);
        });
    })
    // Renvoie d'erreur dans la console si un problème survient
    .catch(error => console.error('Error:', error));
});