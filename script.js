const weddingPopupOpenButton = document.getElementById('weddingPopupOpenButton');
const weddingPopupCloseButton = document.getElementById('weddingPopupCloseButton');
const weddingPopup = document.getElementById('weddingPopup');
const weddingPopupContent = document.getElementById('weddingPopupContent');
const tickets = document.getElementsByClassName('ticket');
const weddingPopupForm = document.getElementById('weddingPopupForm');

// Aç
weddingPopupOpenButton.addEventListener('click', function(e) {
    e.preventDefault();
    weddingPopup.classList.add('active');
    weddingPopupContent.classList.remove('closing');
    weddingPopupContent.style.animation = 'popupFadeIn 0.3s ease forwards';
    Array.from(tickets).forEach((ticket) => {ticket.classList.add('blurred');});
});

// Kapat
function weddingPopupClose() {
    weddingPopupContent.classList.add('closing');
    weddingPopupContent.style.animation = 'popupFadeOut 0.3s ease forwards';
    setTimeout(() => {
        weddingPopup.classList.remove('active');
        Array.from(tickets).forEach((ticket) => {ticket.classList.remove('blurred');});
        weddingPopupContent.classList.remove('closing');
    }, 300); // animasyon süresiyle aynı olmalı
}

weddingPopupCloseButton.addEventListener('click', weddingPopupClose);

weddingPopup.addEventListener('click', function(e) {
    if (e.target === weddingPopup) {
        weddingPopupClose();
    }
});

weddingPopupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const guests = document.getElementById('guests').value;

    alert(`Teşekkürler, ${name}. ${guests} kişi olarak katılımınız alındı.`);
    weddingPopupClose();
    weddingPopupForm.reset();
});


const ceremonyPopupOpenButton = document.getElementById('ceremonyPopupOpenButton');
const ceremonyPopupCloseButton = document.getElementById('ceremonyPopupCloseButton');
const ceremonyPopup = document.getElementById('ceremonyPopup');
const ceremonyPopupContent = document.getElementById('ceremonyPopupContent');
const ceremonyPopupForm = document.getElementById('ceremonyPopupForm');

// Aç
ceremonyPopupOpenButton.addEventListener('click', function(e) {
    e.preventDefault();
    ceremonyPopup.classList.add('active');
    ceremonyPopupContent.classList.remove('closing');
    ceremonyPopupContent.style.animation = 'popupFadeIn 0.3s ease forwards';
    Array.from(tickets).forEach((ticket) => {ticket.classList.add('blurred');});
});

// Kapat
function ceremonyPopupClose() {
    ceremonyPopupContent.classList.add('closing');
    ceremonyPopupContent.style.animation = 'popupFadeOut 0.3s ease forwards';
    setTimeout(() => {
        ceremonyPopup.classList.remove('active');
        tickets.classList.remove('blurred');
        Array.from(tickets).forEach((ticket) => {ticket.classList.remove('blurred');});
    }, 300); // animasyon süresiyle aynı olmalı
}

ceremonyPopupCloseButton.addEventListener('click', ceremonyPopupClose);

ceremonyPopup.addEventListener('click', function(e) {
    if (e.target === ceremonyPopup) {
        ceremonyPopupClose();
    }
});

ceremonyPopupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const guests = document.getElementById('guests').value;

    alert(`Teşekkürler, ${name}. ${guests} kişi olarak katılımınız alındı.`);
    ceremonyPopupClose();
    ceremonyPopupForm.reset();
});
