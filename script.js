function uploadFiles() {
    const files = document.getElementById('fileInput').files;
    if (!files.length) return;

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Data = e.target.result.split(',')[1];
            google.script.run
                .withSuccessHandler(showSuccess)
                .withFailureHandler(showError)
                .uploadFileToDrive(base64Data, file.name, file.type);
        };
        reader.readAsDataURL(file);
    });
}

function showSuccess(result) {
    document.getElementById('status').innerHTML += `Uploaded: ${result.url}<br>`;
}

function showError(error) {
    document.getElementById('status').innerHTML += `Error: ${error.message}<br>`;
}
