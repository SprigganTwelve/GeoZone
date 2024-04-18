/*map is already add in an other js doc */

let container = document.querySelector('.container')
let bool = true
let coords = {}
map.on('click',gameHandler)

//Handler

function gameHandler(event) {
   console.log(event)
    coords.pointA.lat = event.latlng.lat
    coords.pointA.lng = event.latlng.lng
   if(bool){
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
       L.marker([coords.pointA.lat,coords.pointA.lng ], {style: {fill : 'red'}}).addTo(map);
   }
}

function randomNumber (x) {
    let random = Math.floor(Math.random()*x+1)
    return random
}

async function getCountries() {
    let url = "https://restcountries.com/v3.1/all"
    fetch(url).then(resp => resp.json()).then(
        (data)=>{
           let random = randomNumber(data.length);
           let targetedCountry = data[random]
           console.log(targetedCountry)
           let  divHtmlElemnt  = document.createElement('div')
           let htmlScript = `
           <span>${targetedCountry.name.common}</span>
           <span>score : 0 </span>
           `
           divHtmlElemnt.classList.add('down')
           divHtmlElemnt.innerHTML = htmlScript
           container.appendChild(divHtmlElemnt)
        }
    )
    .catch ((error)=>{
        console.error('une erreur :', error)
    })
}

getCountries()

function haversing(coords) {

    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
     }
     
     var lat2 = coords.pointB.lat; 
     var lon2 = coords.pointB.lon; 
     var lat1 = coords.pointA.lat; 
     var lon1 = coords.pointA.lon; 
     
     var R = 6371; // km 
     //has a problem with the .toRad() method below.
     var x1 = lat2-lat1;
     var dLat = x1.toRad();  
     var x2 = lon2-lon1;
     var dLon = x2.toRad();  
     var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                     Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                     Math.sin(dLon/2) * Math.sin(dLon/2);  
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
     var d = R * c; 
     
     return d
}