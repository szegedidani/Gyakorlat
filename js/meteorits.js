function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var data = xhttp.responseText;
    // Innen, ide dolgozz... Itt hívd meg a függvényeid stb. A json file tartalma innen érhető csak
    // Live servert használd mindig
    var obj = JSON.parse(data);

    function sortData(key) {
        var temp;
        for (var j = 0; j < obj.length - 1; j++) {
            for (var h = j + 1; h < obj.length; h++) {
                if (obj[j].key > obj[h].key) {
                    temp = obj[j];
                    obj[j] = obj[h];
                    obj[h] = temp;
                }
            }
        }
    }

    console.log(obj);
    var table = document.getElementById('table');
    table.innerHTML = '';
    for (var k = 0; k < obj.length; k++) {
        var date = new Date(obj[k].year);
        var year = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        var tomeg = parseInt(obj[k].mass);
        var suly = tomeg.toFixed(2);
        table.innerHTML += `<tr>
                                <td>${obj[k].id}</td>
                                <td>${suly}</td>
                                <td>${obj[k].name}</td>
                                <td>${obj[k].nametype}</td>
                                <td>${obj[k].recclass}</td>
                                <td>${obj[k].reclat}</td>
                                <td>${obj[k].reclong}</td>
                                <td>${year}</td>
                            </tr>`
    }
    //Sum
    var massSum = 0;
    for (var l = 0; l < obj.length; l++) {
        massSum += obj[l].mass;
    }
    var sum = document.getElementById('sum');
    sum.innerHTML = parseInt(massSum);

    //Avg
    var avgSum = parseInt(massSum) / obj.length;
    var avg = document.getElementById('avg');
    avg.innerHTML = avgSum;


    //Min
    var minMass = obj[0];
    for (var f = 0; f < obj.length; f++) {
        if (obj[f].mass < minMass) {
            minMass = obj[f].mass;
        }
        var min = document.getElementById('min');
        min.innerHTML = parseInt(minMass);
    }

    //Max
    var maxMass = 0;
    for (var m = 0; m < obj.length; m++) {

        if (obj[m].mass > maxMass) {
            maxMass = obj[m].mass;
        }
        var max = document.getElementById('max');
        max.innerHTML = parseInt(maxMass);
    }


    //Db
    var meteors = 0;
    for (var o = 0; o < obj.length; o++) {
        var ifdate = new Date(obj[o].year);
        var yearOf = ifdate.getFullYear();
        if (yearOf == 1990) {
            meteors += 1;
        }

        var db = document.getElementById('db');
        db.innerHTML = meteors;
    }

    //Min 10K
    var bigMeteors = 0;
    for (var z = 0; z < obj.length; z++) {
        if (obj[z].mass >= 10000) {
            bigMeteors += 1;
        }
    }
    var min10k = document.getElementById('min10k');
    min10k.innerHTML = meteors;

}


getData('/js/meteorits.json', successAjax);



/* 
    A kapott JSON file a Föld-be csapódott meteoritok adatait tartalmazza.

    FELADATOK:
    1. Írasd ki egy táblázatba a következő adatait a meteoritoknak:
        id
        mass
        name
        nametype
        recclass
        reclat
        reclong
        year

     Pozitív, ha ezeket az elemeket nem az innerHTML segítségével hozod létre. 

    2. A táblázatban formázd a tömeget 2 tizedes jegy pontosan. Ha kell kerekíts a legközelebbi egészre.
       A matamatikai kerekítés szabályait használd. Ha valahol egész érték van, ott is legyen a 00 kiiratva
       az egész érték után .
       Formázd a dátumot az alábbi formátumba: 1990. 01. 02. 
    
    3. A táblázat fejlécére kattintva növekvő sorrendbe lehessen rendezni a táblázat adatait az alábbi
       meteorit tulajdonságok szerint: id, mass, name, és reclass.
       Az id és a mass szerinti rendezés számok alapján rendezzen.

    4.  Valósítsd meg a rendezést úgy, hogy nem csak növekvő, hanem csökkenő sorrendbe is lehessen az adatokat rendezni.
        Ha az adatok még nincsenek rendezve, akkor az adott fejlév/tulajdonság alapján növekvő sorrendbe rendezze az adatokat kattintásra.
        Amennyiben még egyszer ugyanarra a fejlécre kattintanak, akkor a sorrend legyen csökkenő. És így tovább....
        Amennyiben egy új fejlécre kattintanak, először mindig növekvő sorrend szerint legyenek az  adatok rendezve.

    5. A táblázat alá az alábbi adatokat ki kell iratni/számolni:

        Az összes meteorit összsúlya
        A legkönyebb meteorit súlya
        A legnehezebb meteorit súlya
        A meteoritok súlyának átlaga
        Hány darab meteorit csapódott be 1990-ben
        Hány darab meteorit súlya legalább 10000

        Ezeket az elemeket ne az innerHTML segítségével hozd létre. Használd az ismert node metódusokat. KÖTELEZŐEN!

    6. Legyen szép a táblázat és az adatok. HAsználj CSS-t a formázáshoz.

    7. Töltsd fel az elkészült fileokat egy github repoba, és küld el a repo elérhetőségét.

    8. Szusszanj egyet.

*/