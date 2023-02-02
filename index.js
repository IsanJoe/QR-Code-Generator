const formGenerator = document.querySelector('#generate-form');
const qr = document.querySelector('#qrcode');

formGenerator.addEventListener('submit', function(e) {
    e.preventDefault();

    clear();

    const urlValue = document.querySelector('#url').value;
    const qrSize = document.querySelector('#size').value;

    if (urlValue === " "){
        alert('Please enter a valid url');
    } else {
        imageScan();
        showSpinner();

        setTimeout(() => {
            hideSpinner();
            generateQRCode(urlValue, qrSize);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            },100)  
        }, 2000)
    }
});

const imageScan = () => {
    document.querySelector('#imageScan').style.display = 'none';
}

const showSpinner = () => {
    document.querySelector('#spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.querySelector('#spinner').style.display = 'none';
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
    })
};

const clear = () => {
    document.querySelector('#qrcode').innerHTML = '';
    const saveLink = document.querySelector('#save-link');
    if (saveLink) {
        saveLink.remove();
    }
    const scanMe = document.querySelector('#meScan');
    if (scanMe) {
        scanMe.remove();
    }
};

const createSaveBtn = (saveUrl) => {
    const scanMe = document.createElement('p');
    scanMe.innerHTML = 'Scan Me';
    scanMe.id = 'meScan'
    scanMe.classList = 'scanMe';
    document.querySelector('#generated').appendChild(scanMe);
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'saveDownload rounded';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Download';
    document.querySelector('#generated').appendChild(link);
}