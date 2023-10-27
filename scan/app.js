

const startScanner = () => {
    const videoElem = document.querySelector("#scanner video");

    const qrScanner = new QrScanner(videoElem, (result) => {
        console.log('Contenu du QR Code :', result);
    });
    
    qrScanner.setCamera("environment");
    qrScanner.start();
}

document.querySelector("#start").addEventListener("click", () => {
    startScanner();
});
