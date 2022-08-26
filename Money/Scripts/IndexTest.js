console.log("  Test  ");


function LoadScript(src, callback) {
    let script = document.createElement("script");
    script.src = src;
    script.onload = () => { callback(script) }
    document.head.append(script);
}

LoadScript("/Scripts/IndexFront.js", function () {
    
    Front();
});

// 
fetch('/Home/GetNameСity')
    .then((response) => {
        console.log("i    response ---" + response);


    });

const promise1 = fetch('/Home/GetNameBank');
const promise2 = fetch('/Home/GetNameBankStreet');

Promise.allSettled([promise1, promise1]).
    then(
        (results) => results.forEach((result) => {


            console.log("   " + result.statusText + "    ** value =    " + result.value);
            var t = JSON.stringify(result.value);
            console.log("******* = " + result.status + "     " + result.status + "  +++ " + t);
        })
    );



/*
var xhr = new XMLHttpRequest();

var body = 'name=' + "kol";

xhr.open("Get", 'GetNameСity', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//xhr.onreadystatechange = ...;

xhr.send(body);
*/