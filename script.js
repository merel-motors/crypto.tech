document.getElementById('search').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let annonces = document.querySelectorAll('.annonce');

    annonces.forEach(annonce => {
        if (annonce.textContent.toLowerCase().includes(filter)) {
            annonce.style.display = "block";
        } else {
            annonce.style.display = "none";
        }
    });
});
