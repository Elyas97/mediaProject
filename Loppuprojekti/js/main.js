//tiedot
let tyyppi=document.getElementsByClassName("addbtn")[0]
let tieto=document.getElementsByClassName('descript')[0];
let maara=document.getElementsByClassName('addnum')[0]
let button=document.getElementsByClassName('sumbitted')[0];
let tuloLista=document.getElementsByClassName("tuloLista")[0];
let menoLista=document.getElementsByClassName("menoLista")[0];
let saldoNyt=document.getElementsByClassName("saldoNyt")[0];
let tulot=document.getElementsByClassName("summaNyt")[0];
let menot=document.getElementsByClassName("menoNyt")[0]
console.log(tuloLista,menoLista)
let taulu=[];

button.addEventListener("click",function () {
    if (tieto.value=="" || maara.value==""){
        alert('Syötteesi on tyhjä')
        return;
        //jos tyhjä ei suoriteta koodia
    }
    if (tyyppi.value =="tulo"){
        let tulot ={
            type : "tulo",
            tieto: tieto.value,
            maara: parseFloat(maara.value)
        }
        taulu.push(tulot)
        tyhjennaSyote()
    }else if(tyyppi.value=="meno"){
        let menot={
            type: "meno",
            tieto: tieto.value,
            maara: parseFloat(maara.value)
        }
        taulu.push(menot)
        tyhjennaSyote()

    }
    let kertynytTulo=summa("tulo",taulu);
    let kertynytMeno=summa("meno",taulu);
    let saldosi=(kertynytTulo-kertynytMeno);
    saldoNyt.innerText=saldosi;
    tulot.innerText=kertynytTulo;
    menot.innerText=kertynytMeno
    naytolleLista(taulu)

})

function summa(tyyppi ,taulu){
    let sum=0;
 for (let i=0;i<taulu.length;i++){
     if (taulu[i].type==tyyppi){
         sum=sum+taulu[i].maara;
     }
 }
 return sum
}

// yrittäkää saamaan tämä toimimaan
//kaikki tiedot on arrayssa loop sitten laitetaan näyttöön
function naytolleLista(taulu){
        for (let i=0;i<taulu.length;i++) {
            let x=taulu[i]
            if (taulu[i].type == "tulo") {
            tuloLista.innerHTML+=
                `<li id="${i}" class="testit"> <figure class="alkiolista">${x.maara}<figcaption>${x.tieto}</figcaption>
                <button class="poista">poista</button> </figure></li>`
            } else if(taulu[i].type == "meno"){
                menoLista.innerHTML+=
                    `<li id="${i}" class="testit"> <figure class="alkiolista">${x.maara}<figcaption>${x.tieto}</figcaption>
                <button class="poista">poista</button> </figure></li>`
            }
}}

function tyhjennaSyote(){
    maara.value="";
    tieto.value="";
}
console.log(taulu)
