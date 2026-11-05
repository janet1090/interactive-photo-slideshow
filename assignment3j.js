"use strict";

window.onload = function () {
    const imageFiles = [
        "photo01.jpg",
        "photo02.jpg",
        "photo03.jpg",
        "photo04.jpg",
        "photo05.jpg",
        "photo06.jpg",
        "photo07.jpg",
        "photo08.jpg"
    ];

    const slidesContainer = document.getElementById("slides");
    const favoritesContainer = document.getElementById("favoritesContainer");
    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");
    const addFavoriteBtn = document.getElementById("addFavoriteBtn");

    let currentStartIndex = 0;
    const visibleCount = 4;
    let slideshowInterval = null;
    let isPlaying = false;
    let currentLightboxImage = "";
    const favorites = [];

    function renderSlides() {
        slidesContainer.innerHTML = "";

        for (let i = 0; i < visibleCount; i++) {
            const imageIndex = (currentStartIndex + i) % imageFiles.length;

            const slideDiv = document.createElement("div");
            slideDiv.className = "slide-item";

            const img = document.createElement("img");
            img.src = imageFiles[imageIndex];
            img.alt = "Gallery image " + (imageIndex + 1);

            img.addEventListener("click", function () {
                openLightbox(imageFiles[imageIndex]);
            });

            slideDiv.appendChild(img);
            slidesContainer.appendChild(slideDiv);
        }
    }

    function showNext() {
        currentStartIndex = (currentStartIndex + 1) % imageFiles.length;
        renderSlides();
    }

    function showPrevious() {
        currentStartIndex = (currentStartIndex - 1 + imageFiles.length) % imageFiles.length;
        renderSlides();
    }

    function toggleSlideshow() {
        if (!isPlaying) {
            slideshowInterval = setInterval(showNext, 2000);
            isPlaying = true;
            playPauseBtn.innerHTML = "&#10074;&#10074;";
        } else {
            clearInterval(slideshowInterval);
            isPlaying = false;
            playPauseBtn.innerHTML = "&#9658;";
        }
    }

    function openLightbox(imageSrc) {
        currentLightboxImage = imageSrc;
        lightboxImage.src = imageSrc;
        lightbox.style.display = "block";

        if (favorites.includes(imageSrc)) {
            addFavoriteBtn.textContent = "Already in Favorites";
            addFavoriteBtn.disabled = true;
        } else {
            addFavoriteBtn.textContent = "Add to Favorites";
            addFavoriteBtn.disabled = false;
        }
    }

    function closeModal() {
        lightbox.style.display = "none";
    }

    function addToFavorites() {
        if (favorites.includes(currentLightboxImage)) {
            alert("This image is already in your favorites.");
            return;
        }

        if (favorites.length >= 5) {
            alert("You can only add a maximum of 5 favorite pictures. Please remove one first.");
            return;
        }

        favorites.push(currentLightboxImage);
        renderFavorites();
        addFavoriteBtn.textContent = "Already in Favorites";
        addFavoriteBtn.disabled = true;
    }

    function removeFavorite(imageSrc) {
        const index = favorites.indexOf(imageSrc);

        if (index !== -1) {
            favorites.splice(index, 1);
            renderFavorites();
        }

        if (currentLightboxImage === imageSrc) {
            addFavoriteBtn.textContent = "Add to Favorites";
            addFavoriteBtn.disabled = false;
        }
    }

    function renderFavorites() {
        favoritesContainer.innerHTML = "";

        for (let i = 0; i < favorites.length; i++) {
            const favDiv = document.createElement("div");
            favDiv.className = "favorite-item";

            const favImg = document.createElement("img");
            favImg.src = favorites[i];
            favImg.alt = "Favorite image " + (i + 1);

            favImg.addEventListener("click", function () {
                openLightbox(favorites[i]);
            });

            const removeLink = document.createElement("span");
            removeLink.className = "remove-link";
            removeLink.textContent = "Remove";

            removeLink.addEventListener("click", function () {
                removeFavorite(favorites[i]);
            });

            favDiv.appendChild(favImg);
            favDiv.appendChild(removeLink);
            favoritesContainer.appendChild(favDiv);
        }
    }

    leftBtn.addEventListener("click", showPrevious);
    rightBtn.addEventListener("click", showNext);
    playPauseBtn.addEventListener("click", toggleSlideshow);
    addFavoriteBtn.addEventListener("click", addToFavorites);
    closeLightbox.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeModal();
        }
    });

    renderSlides();
};