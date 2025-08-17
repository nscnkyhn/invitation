const tickets = document.getElementsByClassName('ticket');
const weddingPopupOpenButton = document.getElementById('weddingPopupOpenButton');
const weddingPopupCloseButton = document.getElementById('weddingPopupCloseButton');
const weddingPopup = document.getElementById('weddingPopup');
const weddingPopupContent = document.getElementById('weddingPopupContent');
const weddingPopupForm = document.getElementById('weddingPopupForm');
const weddingPopupFormSaveButton = document.getElementById('weddingPopupFormSaveButton');
const ceremonyPopupOpenButton = document.getElementById('ceremonyPopupOpenButton');
const ceremonyPopupCloseButton = document.getElementById('ceremonyPopupCloseButton');
const ceremonyPopup = document.getElementById('ceremonyPopup');
const ceremonyPopupContent = document.getElementById('ceremonyPopupContent');
const ceremonyPopupForm = document.getElementById('ceremonyPopupForm');
const ceremonyPopupFormSaveButton = document.getElementById('ceremonyPopupFormSaveButton');

weddingPopupOpenButton.addEventListener('click', function (e) {
    //e.preventDefault();
    //openPopup(weddingPopup, weddingPopupContent);
});
ceremonyPopupOpenButton.addEventListener('click', function (e) {
    e.preventDefault();
    openPopup(ceremonyPopup, ceremonyPopupContent);
});

weddingPopupCloseButton.addEventListener('click', () => {
    closePopup(weddingPopup, weddingPopupContent);
});
ceremonyPopupCloseButton.addEventListener('click', () => {
    closePopup(ceremonyPopup, ceremonyPopupContent);
});

weddingPopup.addEventListener('click', function (e) {
    if (e.target === weddingPopup) {
        closePopup(weddingPopup, weddingPopupContent);
    }
});
ceremonyPopup.addEventListener('click', function (e) {
    if (e.target === ceremonyPopup) {
        closePopup(ceremonyPopup, ceremonyPopupContent);
    }
});

weddingPopupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let guestName = document.getElementById('weddingPopupNameInput').value;
    let guestCount = document.getElementById('weddingPopupCountInput').value;
    let guestId = document.getElementById('weddingGuestId').value;
    let action = e.submitter.value;

    let formData = new FormData();
    formData.append('type', "wedding");
    formData.append('action', action);
    formData.append('guestName', guestName);
    formData.append('guestCount', guestCount);

    if ((action === "updateGuest" || action === "deleteGuest") && guestId && guestId !== 0) {
        formData.append('guestId', guestId);
    }

    fetch('/guest_tracker', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            console.log('Server response:', data);
            if (action === 'addGuest') {
                weddingPopupOpenButton.innerText = "Güncelle";
                weddingPopupFormSaveButton.value = "updateGuest";
                alert("Kaydınız başarıyla alınmıştır.");
            } else if (action === 'deleteGuest') {
                weddingPopupOpenButton.innerText = "Ekle";
                weddingPopupFormSaveButton.value = "addGuest";
                alert("Kaydınız başarıyla silinmiştir.");
            } else if (action === 'updateGuest') {
                alert("Kaydınız başarıyla güncellenmiştir.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Kaydedilirken sorun oluştu. Lütfen daha sonra tekrar deneyin.");
        });

    closePopup(weddingPopup, weddingPopupContent);
});

ceremonyPopupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let guestName = document.getElementById('ceremonyPopupNameInput').value;
    let guestCount = document.getElementById('ceremonyPopupCountInput').value;
    let guestId = document.getElementById('ceremonyGuestId').value;
    let action = e.submitter.value;

    let formData = new FormData();
    formData.append('type', "ceremony");
    formData.append('action', action);
    formData.append('guestName', guestName);
    formData.append('guestCount', guestCount);

    if ((action === "updateGuest" || action === "deleteGuest") && guestId && guestId !== 0) {
        formData.append('guestId', guestId);
    }

    fetch('/guest_tracker', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            console.log('Server response:', data);
            if (data === "ok") {
                if (action === 'addGuest') {
                    ceremonyPopupOpenButton.innerText = "Güncelle";
                    ceremonyPopupFormSaveButton.value = "updateGuest";
                    alert("Kaydınız başarıyla alınmıştır.");
                } else if (action === 'deleteGuest') {
                    ceremonyPopupOpenButton.innerText = "Ekle";
                    ceremonyPopupFormSaveButton.value = "addGuest";
                    alert("Kaydınız başarıyla silinmiştir.");
                } else if (action === 'updateGuest') {
                    alert("Kaydınız başarıyla güncellenmiştir.");
                }
            } else {
                alert("Kaydedilirken sorun oluştu. Lütfen daha sonra tekrar deneyin");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Kaydedilirken sorun oluştu. Lütfen daha sonra tekrar deneyin.");
        });

    closePopup(ceremonyPopup, ceremonyPopupContent);
});

function closePopup(popup, popupContent) {
    popupContent.classList.add('closing');
    popupContent.style.animation = 'popupFadeOut 0.3s ease forwards';
    setTimeout(() => {
        popup.classList.remove('active');
        Array.from(tickets).forEach((ticket) => {
            ticket.classList.remove('blurred');
        });
    }, 300);
}

function openPopup(popup, popupContent) {
    popup.classList.add('active');
    popupContent.classList.remove('closing');
    popupContent.style.animation = 'popupFadeIn 0.3s ease forwards';
    Array.from(tickets).forEach((ticket) => {
        ticket.classList.add('blurred');
    });
}

// Turn all inputs with class "filepond" into FilePond
const pond = FilePond.create(document.querySelector('.filepond'), {
allowMultiple: true,
acceptedFileTypes: ['image/*'],
labelIdle: '📸 Fotoğraf eklemek için sürükleyip bırakın veya <span class="filepond--label-action">tıklayın</span>',
server: {
// Return a unique id (we’ll return a filepath token)
process: {
url: '/upload.php?action=process',
method: 'POST',
withCredentials: false,
},
// Body contains the token you returned in process
revert: '/upload.php?action=revert',
// Optional: let FilePond preview a previously uploaded file by url
load: '/upload.php?action=load&file=',
}
});
