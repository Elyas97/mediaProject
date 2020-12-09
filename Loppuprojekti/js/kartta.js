const map = createMap(coordinates(60.17, 24.90), 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

addMarker(coordinates(60.1740, 24.9081), "<b>Toimipiste!</b><br>Terve!");

map.on('locationfound', onLocationFound);
paikanna();

// Tekee kartan ja palauttaa sen.
function createMap(crd, zoom) {
	return L.map('mapid').setView([crd.latitude, crd.longitude], zoom);
}

// Lisää karttaan markkerin.
function addMarker(crd, text) {
	let marker = L.marker([crd.latitude, crd.longitude]).addTo(map);
	marker.bindPopup(text);
}

// Functio, joka palauttaa koordinaattit muuttujana.
function coordinates(arg1, arg2) {
	let kooridnaatti = {
		latitude: arg1,
		longitude: arg2
	};
	return kooridnaatti;
}

// Sijainnin löytyessä kertoo about missä olet.
function onLocationFound(e) {
	var radius = e.accuracy / 2;
	L.marker(e.latlng).addTo(map)
		.bindPopup("You are within " + radius + " meters from this point").openPopup();
	L.circle(e.latlng, radius).addTo(map);
}

// Functio, joka päivittää kartan näyttämään tietyn sijainnin
function paivitaKartta(crd, zoom) {
	// Käytetään leaflet.js -kirjastoa näyttämään sijainti kartalla (https://leafletjs.com/)
	map.setView([crd.latitude, crd.longitude], zoom);
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Paikantaa oman sijainnin.
function paikanna() {
	map.locate({
		setView: true,
		maxZoom: 13,
		watch: false
	});
}