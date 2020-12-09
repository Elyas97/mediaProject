// tiedot
let tyyppi = document.getElementsByClassName("addbtn")[0]
let tieto = document.getElementsByClassName('descript')[0];
let maara = document.getElementsByClassName('addnum')[0]
let button = document.getElementsByClassName('sumbitted')[0];
let tuloLista = document.getElementsByClassName("tuloLista")[0];
let menoLista = document.getElementsByClassName("menoLista")[0];
let saldoNyt = document.getElementsByClassName("saldoNyt")[0];
let tulot = document.getElementsByClassName("summaNyt")[0];
let menot = document.getElementsByClassName("menoNyt")[0]
console.log(tuloLista, menoLista)
let taulu = [];

button.addEventListener("click", function () {
	if (tieto.value == "" || maara.value == "") {
		alert("Syötteesi on tyhjä")
		return; // jos tyhjä ei suoriteta koodia
	}
	if (maara.value < 0) {
		alert("Syötä positiivinen luku")
		return; // jos positiivinen niin ei suoriteta
	}
	if (maara.value > 1000000000000) {
		alert("Syötteesi on liian iso!\nMax 1,000,000,000,000");
		return; // jos syöte on liian iso niin ei suoriteta
	}
	// jos on valittu tulo niin luodaan objekti
	if (tyyppi.value == "tulo") {
		let tulot = {
			type: "tulo",
			tieto: tieto.value,
			maara: parseFloat(maara.value)
		}
		taulu.push(tulot);
		tyhjennaSyote();
	} else if (tyyppi.value == "meno") {
		let menot = {
			type: "meno",
			tieto: tieto.value,
			maara: parseFloat(maara.value)
		}
		taulu.push(menot);
		tyhjennaSyote();
	}
	naytolleLista(taulu);
});

// laskee summan arrayssa ottamalla huomioon onko tulo vai meno
function summa(tyyppi, taulu) {
	let sum = 0;
	for (let i = 0; i < taulu.length; i++) {
		if (taulu[i].type == tyyppi) {
			sum = sum + taulu[i].maara;
		}
	}
	return sum;
}

function naytolleLista(taulu) {
	// lasketaan saldo
	let kertynytTulo = summa("tulo", taulu);
	let kertynytMeno = summa("meno", taulu);
	let saldosi = (kertynytTulo - kertynytMeno);
	// näytölle
	saldoNyt.innerText = saldosi;
	tulot.innerText = kertynytTulo;
	menot.innerText = kertynytMeno;
	// tyhjennetään vanha lista ja uusi
	tuloLista.innerHTML = "";
	menoLista.innerHTML = "";
	// tulostetaan lista
	for (let i = 0; i < taulu.length; i++) {
		let x = taulu[i];
		if (taulu[i].type == "tulo") {
			//annetaan special id jokaiselle listalle myöhemmin poistetaan
			tuloLista.innerHTML +=
				`<li id="${i}" class="listaTulo"> <figure class="alkiolista">${x.tieto}</figure>
                <p>${x.maara}<button class="poista">poista</button></p></li>`;
		} else if (taulu[i].type == "meno") {
			menoLista.innerHTML +=
				`<li id="${i}" class="listaMeno"> <figure class="alkiolista">${x.tieto}</figure>
                <p>${x.maara} <button class="poista2">poista</button></p></li>`;
		}
	}
}

function tyhjennaSyote() {
	maara.value = "";
	tieto.value = "";
}

// poistetaan elementti valitussa indeksissä
function poistaElementti(index, array) {
	array.splice(index, 1);
}

// julkinen event listerner kaikille poista buttoneille
addEventListener('click', function (e) {
	let kohde = e.target;
	// mennään buttonista isäntään joka on li,siellä on erityinen id
	let käynti = kohde.parentNode.parentNode;
	if (kohde.className === "poista") {
		poistaElementti(käynti.id, taulu)
	} else if (kohde.className === "poista2") {
		poistaElementti(käynti.id, taulu);
	}
	naytolleLista(taulu);
});