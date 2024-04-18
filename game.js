/*map is already add in an other js doc */

let container = document.querySelector('.container')
let popup = document.querySelector('.popup')
let bool = true
let coords = {pointA:{},pointB: {}}
map.on('click',gameHandler)
let scoreField;
let scorePoint
let message
//Handler

function gameHandler(event) {
    getCountries(true,event)
}


getCountries(false)

function randomNumber (x) {
    let random = Math.floor(Math.random()*x+1)
    return random
}

async function getCountries(gameStarted,event = {}) {
    let url = "https://restcountries.com/v3.1/all"
   await fetch(url).then(resp => resp.json()).then(
        (data)=>{
            if(gameStarted){
                coords.pointA.lat = event.latlng.lat
                coords.pointA.lng = event.latlng.lng 
                console.log(coords)
                if(bool){
                   L.marker([coords.pointA.lat,coords.pointA.lng ], {style: {fill : 'red'}}).addTo(map);
                   let segmentAB = haversing(coords)
                   console.log(scoreField)
                  switch (true) {
                    case (segmentAB < 50):
                        message = "<h2 class ='message'>Super Proche ! <h2>"
                        break;
                    case (segmentAB < 100):
                            message = "<h2 class ='message'>Pas mal ! <h2>"
                            break; 
                    case (segmentAB < 500):
                            message = "<h2 class ='message'>Mouais ! <h2>"
                            break; 
                    case (segmentAB < 800):
                            message = "<h2 class ='message'> ça fait cher le TGV <h2>"
                            break;
                    case (segmentAB == 0):
                                message = "<h2 class ='message'>vous être un monstre! <h2>"
                                break;
                    default:
                        message = "<h2 class ='message'>Trop loin! <h2>"
                        break;

                  }
                  popup.innerHTML = message
                  popup.classList.add('animate','animate__bounceIn') // css animate
                  let next = document.createElement('button')
                  next.textContent = 'Next'
                  next.classList.add('next')
                  popup.appendChild(next)
                  
                }
            }
            else{
                setRandomCountry(data,coords)
            }
        }
    )
    .catch ((error)=>{
        console.error('une erreur :', error)
    })
}





function haversing(coords) {

    const R = 6371; // en km
    // On convertit les degrés en radian
    const lat1 = coords.pointA.lat * Math.PI / 180;
    const lat2 = coords.pointB.lat * Math.PI / 180;
    const lon1 = coords.pointA.lng * Math.PI / 180;
    console.log(lon1)
    const lon2 = coords.pointB.lon * Math.PI / 180;
    

    // On calcule la distance entre les deux points
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
  
    // Formule de Haversine
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    console.log(typeof(distance));
    // console.log("R : "+ R + " ; Point A lat : "+ lat1 + " ,lon : "+ lon1 + " ; point B lat : "+ lat2 +" , lon: "+ lon2 +" ; dlat: "+ dLat +" ; dlon: "+ dLon +" ; a: "+ a +  " ; c :"+ c +" ; distance: "+ distance);
    return distance

}


function setRandomCountry(data,coords) {
    let random = randomNumber(data.length);
    console.log(data)
    let targetedCountry = data[random]
    console.log(targetedCountry)
    let  divHtmlElemnt  = document.createElement('div')
    let htmlScript = `
    <span>${targetedCountry.name.common}</span>
    <span id='score'>score : 0 </span>
    `
    
    divHtmlElemnt.classList.add('down')
    divHtmlElemnt.innerHTML = htmlScript
    scoreField = divHtmlElemnt.querySelector('#score')
    container.appendChild(divHtmlElemnt)
    coords.pointB.lat = targetedCountry.latlng[0]
    coords.pointB.lon = targetedCountry.latlng[1]
}

//Bonus
                // var customIcon = L.icon({
                //     // iconUrl: 'marker-icon.png', // URL de l'image de l'icône
                //     iconSize: [25, 41],  // Taille de l'icône [largeur, hauteur]
                //     iconAnchor: [12, 41], // Point d'ancrage de l'icône [horizontal, vertical]
                //     popupAnchor: [1, -34], // Point d'ancrage du popup [point horizontal et vertical]
                //     shadowUrl: 'marker-shadow.png', // URL de l'ombre de l'icône
                //     shadowSize: [41, 41], // Taille de l'ombre de l'icône [largeur, hauteur]
                //     shadowAnchor: [12, 41], // Point d'ancrage de l'ombre de l'icône
                //     iconColor: 'red' // Couleur de l'icône (utilisation d'une icône en noir et blanc avec une couleur d'incrustation)
                // });