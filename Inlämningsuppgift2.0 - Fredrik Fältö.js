//Skapar tomma arrayer för att spara Personer, Superhjältar och en som innehåller båda
var arrPersons = [];
var arrHeroes = [];
var arrAll = [];

//Skapar en klass som heter Person
class Person {
    //Constructor metod för klassen Person
    constructor(fName, lName, age, legal) {
        this.fName = fName;
        this.lName = lName;
        this.age = age;

        //Kollar om den inmatade personen är legal (18 år gammal eller äldre)
        if (age >= 18) {
            this.legal = true;
        } else {
            this.legal = false;
        }
    }

    //Funktion för att skriva ut informationen som användaren matat in men först en check om det är en superhjälte eller inte
    toString() {
        if (this.heroname == "" || this.heroname == null) {
            return `${this.fName} ${this.lName}, ${this.age} legal: ${this.legal}<br>`;
        } else {
            return `Welcome ${this.heroname}! Alter ego: ${this.fName} ${this.lName}, ${this.age} legal: ${this.legal}.<br>`;
        }
    }

    //Funktion för att öka objektets ålder med 1
    birthday() {
        this.age++;
    }

    //Funktion som tar in en parameter för att hälsa på annan person eller superhjälte
    greetings (otherPerson) {
        return `${this.fName} greets ${otherPerson.fName}!`;
    }
}

//Skapar en klass som heter Superhero som ärver från klassen Person
class Superhero extends Person {
    //Constructor metod för klassen Superhero
    constructor(fName, lName, age, legal, heroname) {
        //Anropar constructor i baseklassen
        super(fName, lName, age, legal);

        this.heroname = heroname;
    }

    //Funktion för att skriva ut att en superhjälte flyger
    fly() {
        return `Nu flyger ${this.heroname}! <br>`;
    }
}

//Funktion som körs när användaren trycker på "Registrera" knappen
function submit() {
    //Hämtar värden från inputfälten
    let fName = document.getElementById("txtfName").value;
    let lName = document.getElementById("txtlName").value;
    let age = document.getElementById("txtAge").value;
    let heroName = document.getElementById("txtHeroname").value;
    let legal = false;

    //Validering för att se så att inget fält är tomt
    if (fName == "" || fName == null) {
        alert("Please enter your firstname!");
        return;
    }

    if (lName == "" || lName == null) {
        alert("Please enter your lastname!");
        return;
    }

    if (age == "" || age == null) {
        alert("Please enter your age!");
        return;
    }

    //Kollar om age är 18 eller över och sätter i så fall legal till true
    if (age >= 18) {
        legal = true;
    }

    //If-sats som kollar om checkboxen är iklickad, om den inte är det så skapas en Person
    //Är den ikryssad skapas istället en Superhero
    if ((document.getElementById("chkHero").checked == false)) {
        var user = new Person(fName, lName, age, legal);
        arrPersons.push(user);
        arrAll.push(user);
    
        document.getElementById("output").innerHTML = user.toString();
    } else {
        //Validering så att det finns ett superhjältenamn, om inte så får användaren upp en alert
        //Om det finns ett superhjältenamn skapas en Superhero och de inmatade värdena skrivs ut i "output"-taggen
        if (heroName == "" || heroName == null) {
            alert("Please enter your superheroname!");
            return;
        } else {
            var user = new Superhero(fName, lName, age, legal, heroName);
            arrHeroes.push(user);
            arrAll.push(user);
    
            document.getElementById("output").innerHTML = user.toString();
        }
    }

    //Tömmer inputfälten efter registrering för att underlätta om fler användare ska skapas
    document.getElementById("txtfName").value = "";
    document.getElementById("txtlName").value = "";
    document.getElementById("txtAge").value = "";
    document.getElementById("txtHeroname").value = "";
    document.getElementById("chkHero").checked = false;
}

//Funktion som anropas när användaren ska få superhjältarna att flyga
function letsFly() {
    //Tömmer output-taggarna innan funktionen körs för en bättre användarupplevelse
    document.getElementById("output").innerHTML = "";
    document.getElementById("output2").innerHTML = "";

    //Foreach loop för att få alla superhjältar att flyga
    arrHeroes.forEach(element => {
        document.getElementById("output").innerHTML += element.fly();
    });
}

//Funktion för att öka användares och superhjältars ålder
function happyBirthday() {
//Ökar åldern på varje Person med 1
    arrPersons.forEach(element => {
        element.birthday();

        //If-sats för att kolla om personens ålder nu är lika med eller över 18 och sätter då legal till true
        if (element.age >= 18) {
            element.legal = true;
        }
    });

    //Ökar åldern på varje Superhjälte med 1
    arrHeroes.forEach(element => {
        element.birthday();

        //If-sats för att kolla om personens ålder nu är lika med eller över 18 och sätter då legal till true
        if (element.age >= 18) {
            element.legal = true;
        }
    });

    //Anropar funktionen allPeople som skriver ut alla personer och superhjältar med deras nya ålder
    allPeople();
}

//Funktion för att skriva ut alla användare
function allPeople() {
    //Tömmer output-taggarna innan funktionen körs för en bättre användarupplevelse
    document.getElementById("output").innerHTML = "";
    document.getElementById("output2").innerHTML = "";


    //Foreach loop för att skriva ut alla personer
    arrPersons.forEach(element => {
        document.getElementById("output2").innerHTML += `${element.fName} ${element.lName}, ${element.age} legal: ${element.legal} <br>`;
    });

    //Foreach loop för att skriva ut alla superhjältar
    arrHeroes.forEach(element => {
        document.getElementById("output2").innerHTML += `${element.heroname}, alter ego: ${element.fName} ${element.lName}, ${element.age} legal: ${element.legal}<br>`;
    });
}

//Funktion för att skriva ut hälsningsmeddelanden
function greetingsFriend() {
    //Tömmer output-taggarna innan funktionen körs för en bättre användarupplevelse
    document.getElementById("output").innerHTML = "";
    document.getElementById("output2").innerHTML = "";


    //Forloop för att loopa igenom alla skapta objekt
    for (let i = 0; i < arrAll.length; i++) {
        //Forloop för att återigen loopa igenom alla skapta objekt men inuti den första loopen för att kunna -
        //skriva ut hälsningsmeddelande för alla objekt förutom "sig själva"
        for (let k = 0; k < arrAll.length; k++) {
            //När objekt på t.ex. position 0 i arrayen träffar på sig själv så hoppas den över
            if (i == k) {
                continue;
            }

            //Skriver ut hälsningsmeddelande där varje objekt hälsar på alla andra
            document.getElementById("output2").innerHTML += `${arrAll[i].greetings(arrAll[k])}<br>`;
        }
    }
}