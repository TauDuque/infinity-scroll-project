const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//unsplash API
let count = 7;
const apiKey = "1IwNjDbrQ501TbyVy73Igumn8erM9OG8XEZeKHSYSdE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//verifica se as imagens estão carregadas
function imageLoader() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 20;
  }
}

//helper function pra setAttributes e não ficar repetindo codigo
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

/* Create elements for links and photos, add to DOM */
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //run function for each object in photosArrarray
  photosArray.forEach((photo) => {
    // cria <a> para anaexar com UNsplash
    const item = document.createElement("a");
    /* item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank"); */
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //criar img para foto
    const img = document.createElement("img");
    /* img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description); */
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //event listener, verificar quando cada um termina
    img.addEventListener("load", imageLoader);
    //colocar img dentro de <a> depois colocar no imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

//check to see if scrolling near button of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
