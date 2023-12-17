const resultDiv = document.getElementById('result');


// Fonction appelée lors du clic sur le bouton "Analyser le QR code"
function processQRCode() {
    // Récupération de l'image du QR code
    const input = document.getElementById('qrInput');

    // Réinitialisation du résultat
    resultDiv.innerHTML = '';

    // Vérification qu'une image a bien été sélectionnée
    if (input.files.length > 0) {

        // Récupération de l'image
        const file = input.files[0];

        // Création d'un objet FileReader qui permet de lire les données du fichier de manière asynchrone
        const reader = new FileReader();

        reader.readAsDataURL(file);

        // Appel de la fonction decodeQRCode lorsque le fichier a été lu
        reader.onload = function (e) {
            const imageData = e.target.result;
            decodeQRCode(imageData);
        };

        // Si il n'y a pas d'image sélectionnée
    } else {
        resultDiv.innerHTML = 'Veuillez sélectionner une image QR Code.';
    }
}

// Fonction qui décode le QR code

function decodeQRCode(imageData) {

    // Création d'un objet Image qui permettra de déterminer si l'image est un QR code
    const img = new Image();
    img.src = imageData;

    // Lancement de la fonction lorsque l'image a été chargée
    img.onload = function () {

        // Création d'un élément canvas grâce à l'image chargée dont on se servira pour lire les pixels de l'image et déterminer si c'est un QR code
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        // Récupération des données
        const imageData = context.getImageData(0, 0, img.width, img.height);

        // Détection du QR code à l'aide de la librairie jsQR
        const code = jsQR(imageData.data, imageData.width, imageData.height);
    
        if (code) {
            // Récupération du contenu du QR code si l'image en contient un
            const qrContent = code.data;
            callAPI(qrContent);

            // Si l'image ne contient pas de QR code
        } else {
            resultDiv.innerHTML = 'L\'image fournie ne contient pas de QR code. Veuillez sélectionner une autre image ou prendre une autre photo de votre QR code.';
        }
    };
}

// Fonction qui appelle l'API avec le contenu du QR code
function callAPI(qrContent) {
    const apiUrl = `http://localhost:8000/api/ticket/${qrContent}`;

    // Appel API avec fetch
    fetch(apiUrl)
        .then(response => {
            // Verification du code de réponse HTTP pour savoir si la requête a fonctionné
            if (!response.ok) {
                // Si le code de réponse est 404, le QR code est incorrect
                if (response.status === 404) {
                    throw new Error('QR code incorrect');
                }
            }
            // Promesse pour le .then qui servira à récupérer les données de la réponse API
            return response.json();
        })

        // Récupération des données et conversion en JSON
        .then(data => displayEventData(data))

        // Renvoie d'erreur dans la console si un problème survient
        .catch(error => handleAPIError(error));
}

// Fonction qui gère les erreurs de l'API
function handleAPIError(error) {
    //  Lorsque le QR code est incorrect
    if (error.message === 'QR code incorrect') {
        resultDiv.innerHTML = 'Le QR code est incorrect.';

        // Par défaut
    } else {
        resultDiv.innerHTML = 'Une erreur s\'est produite lors de la récupération des données de l\'API.';
    }
    console.error(error);
}

// Fonction qui affiche les données de l'API sur la page HTML

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

        const eventCategory = document.createElement('p');
        eventCategory.classList.add('event-category');
        eventCategory.textContent = `Catégorie de votre ticket : ${data.ticket.category}`;

        const eventSeat = document.createElement('p');
        eventSeat.classList.add('event-seat');
        eventSeat.textContent = `Place : ${data.ticket.seat}`;

        let currency = "";

        if (data.ticket.currency === "EUR") {
            currency = "€";
        }
        else if (data.ticket.currency === "JPY") {
            currency = "¥";
        }
        else if (data.ticket.currency === "NZD") {
            currency = "$NZ";
        }

        const eventPrice = document.createElement('p');
        eventPrice.classList.add('event-price');
        eventPrice.textContent = `Prix : ${data.ticket.price}${currency}`;



        resultDiv.appendChild(eventTitle);
        eventDetail.appendChild(eventTeams);
        eventDetail.appendChild(eventStadium);
        eventDetail.appendChild(eventDate);
        eventDetail.appendChild(eventCategory);
        eventDetail.appendChild(eventSeat);
        eventDetail.appendChild(eventPrice);
        resultDiv.appendChild(eventDetail);
}

// Fonction qui formate la date de l'événement récupérée

function formatEventDate(eventDateStr) {
    // Création d'un objet Date
    const eventDate = new Date(eventDateStr);

    // Options de formatage
    const options = {
        month: '2-digit', // Deux chiffres pour le mois
        day: '2-digit',   // Deux chiffres pour le jour
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,     // Format 24 heures
    };

    // Formatage de la date avec les options définies au-dessus
    const formattedDate = eventDate.toLocaleString('fr-FR', options);

    return formattedDate;
}