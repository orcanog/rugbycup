const resultDiv = document.getElementById('result');

function processQRCode() {
    const input = document.getElementById('qrInput');

    if (input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageData = e.target.result;
            decodeQRCode(imageData);
        };

        reader.readAsDataURL(file);
    } else {
        resultDiv.innerHTML = 'Veuillez sélectionner une image QR Code.';
    }
}

function decodeQRCode(imageData) {
    const img = new Image();
    img.src = imageData;

    img.onload = function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
            const qrContent = code.data;
            callAPI(qrContent);
        } else {
            resultDiv.innerHTML = 'L\'image fournie ne contient pas de QR code. Veuillez sélectionner une autre image ou prendre une autre photo de votre QR code.';
        }
    };
}

function callAPI(qrContent) {
    const apiUrl = `http://localhost:8000/api/ticket/${qrContent}`;

    // Appel API avec fetch
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('QR code incorrect');
                }
            }
            return response.json();
        })
        .then(data => displayEventData(data))
        .catch(error => handleAPIError(error));
}

function handleAPIError(error) {
    const resultDiv = document.getElementById('result');
    if (error.message === 'QR code incorrect') {
        resultDiv.innerHTML = 'Le QR code est incorrect.';
    } else {
        resultDiv.innerHTML = 'Une erreur s\'est produite lors de la récupération des données de l\'API.';
    }
    console.error(error);
}

function displayEventData(data) {
        // Traitement des données de la réponse API
        const eventTitle = document.createElement("h3");
        eventTitle.classList.add("event-title");
        eventTitle.textContent = "Voici votre ticket pour le match :"

        const eventDetail = document.createElement('div');
        eventDetail.classList.add('event-detail');

        const eventTeams = document.createElement('p');
        eventTeams.classList.add('event-teams');
        eventTeams.textContent = `${data.ticket.event.team_home ?? "-"} vs ${data.ticket.event.team_away ?? "-"}`;

        const eventStadium = document.createElement('p');
        eventStadium.classList.add('event-stadium');
        eventStadium.textContent = `${data.ticket.event.stadium}`;

        const eventDate = document.createElement('p');
        eventDate.classList.add('event-date');
        eventDate.textContent = `${formatEventDate(data.ticket.event.start)}`;

        resultDiv.appendChild(eventTitle);
        eventDetail.appendChild(eventTeams);
        eventDetail.appendChild(eventStadium);
        eventDetail.appendChild(eventDate);
        resultDiv.appendChild(eventDetail);
        resultDiv.classList.remove("hidden");
        resultDiv.classList.add("active");
}

function formatEventDate(eventDateStr) {
    // Créer un objet Date à partir de la chaîne
    const eventDate = new Date(eventDateStr);

    // Options de formatage
    const options = {
        month: '2-digit', // Deux chiffres pour le mois
        day: '2-digit',   // Deux chiffres pour le jour
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,     // Format 24 heures
    };

    // Formater la date en utilisant les options
    const formattedDate = eventDate.toLocaleString('fr-FR', options);

    return formattedDate;
}