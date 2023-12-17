const eventsContainer = document.querySelector('#events');

window.addEventListener('load', function () {
    fetch("http://localhost:8000/api/events")
    .then(response => response.json())
    .then(data => {
    
        // Assurez-vous que data.events est un tableau
        const eventsData = data.events || [];

        eventsData.forEach((item) => {
            // Créer un nouvel élément div pour chaque événement
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

            // Créer un nouvel élément h4 pour le titre de l'événement
            const eventTitle = document.createElement('p');
            eventTitle.classList.add('event-title');
            eventTitle.textContent = `${item.team_home?.country ?? "-"} vs ${item.team_away?.country ?? "-"}`;

            // Ajouter le titre à la div de l'événement
            eventDiv.appendChild(eventStadium);
            eventDiv.appendChild(eventDate);
            eventDivTeams.appendChild(eventTitle);
            eventDiv.appendChild(eventDivTeams);

            // Ajouter la div de l'événement au conteneur d'événements
            eventsContainer.appendChild(eventDiv);
        });
    })
    .catch(error => console.error('Error:', error));
});