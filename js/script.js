/*
Consegna:
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.




-creare e inserire array dato
-creare una var indice attuale
-impostare come img titolo e testo dispaly principale
i relativi dati presi da array[0]
-usare una funzione che crei le thumbnail
    -aggiungere subito che onclick si aggiorana indice
-creare elem per i pulsanti, 4 totali
-var booleana per autoplay e reverse


*/

const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

let activeImgEl = document.getElementById("active-img");
let activeTitleEl = document.getElementById("active-title");
let activeDescEl = document.getElementById("active-description");
let thumContainerEl = document.getElementById("thumb-container");
let activeIndex = 0;
let thumbnails = [];
const upBtn = document.getElementById("btn-su");
const dwnBtn = document.getElementById("btn-giu");
const playBtn = document.getElementById("btn-play");
const reverseBtn = document.getElementById("btn-reverse");
let isPlaying = false;
let isReverse = false;
let stopOne ;
let stopTwo ;





activeImgEl.src = images[activeIndex].image;
activeTitleEl.innerText = images[activeIndex].title;
activeDescEl.innerText = images[activeIndex].text;

images.forEach((elementoSingolo, index) => {
    thumbnails.push(createThumbnail(elementoSingolo.image, index));
    
})

thumbnails[activeIndex].classList.add("thumb-active");


reverseBtn.addEventListener("click", function(){
    if(isReverse){
        reverseBtn.classList.remove("btn-active")
        isReverse = false;
    } else{
        reverseBtn.classList.add("btn-active");
        isReverse = true;
    }
})

playBtn.addEventListener("click", function(){
    if(!isPlaying){
        if(isReverse){
            stopOne = setInterval(funzioneBtnSu, 3000);
            isPlaying = true;
            playBtn.classList.add("btn-active")
        }else {
            stopTwo = setInterval(funzioneBtnGiu, 3000);
            isPlaying = true;
            playBtn.classList.add("btn-active");
        }
    } else{
        clearInterval(stopOne);
        clearInterval(stopTwo);
        playBtn.classList.remove("btn-active");
        isPlaying = false;
    }
})





upBtn.addEventListener("click", function(){
   funzioneBtnSu();
})

dwnBtn.addEventListener("click", function(){
    funzioneBtnGiu();
})









/*funzioni*/
function createThumbnail(imgSrc, index){
    let newThumbnail = document.createElement("div");
    newThumbnail.setAttribute("indice", index);
    let newImg = document.createElement("img");
    thumContainerEl.append(newThumbnail);
    newThumbnail.append(newImg);
    newThumbnail.classList.add("thumb-img");
    newImg.classList.add("my-img");
    newImg.src = imgSrc;

    newThumbnail.addEventListener("click", function(){
        thumbnails.forEach((elementoSingolo) => {
            elementoSingolo.classList.remove("thumb-active");
        })
        newThumbnail.classList.add("thumb-active");
        activeIndex = newThumbnail.getAttribute("indice");
        activeImgEl.src = images[activeIndex].image;
        activeTitleEl.innerText = images[activeIndex].title;
        activeDescEl.innerText = images[activeIndex].text;

    })
    
    return newThumbnail;

}

function funzioneBtnSu(){
    thumbnails[activeIndex].classList.remove("thumb-active");
    if(activeIndex == 0){
        activeIndex = images.length - 1;
        activeImgEl.src = images[activeIndex].image;
        activeTitleEl.innerText = images[activeIndex].title;
        activeDescEl.innerText = images[activeIndex].text;
    } else{
        activeIndex--;
        activeImgEl.src = images[activeIndex].image;
        activeTitleEl.innerText = images[activeIndex].title;
        activeDescEl.innerText = images[activeIndex].text;
    }
    thumbnails[activeIndex].classList.add("thumb-active");
}

function funzioneBtnGiu(){
    thumbnails[activeIndex].classList.remove("thumb-active");
    if(activeIndex == images.length -1){
        activeIndex = 0;
        activeImgEl.src = images[activeIndex].image;
        activeTitleEl.innerText = images[activeIndex].title;
        activeDescEl.innerText = images[activeIndex].text;
    } else{
        activeIndex++;
        activeImgEl.src = images[activeIndex].image;
        activeTitleEl.innerText = images[activeIndex].title;
        activeDescEl.innerText = images[activeIndex].text;
    }
    thumbnails[activeIndex].classList.add("thumb-active");
}