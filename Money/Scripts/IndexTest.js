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

/*
var xhr = new XMLHttpRequest();

var body = 'name=' + "kol";

xhr.open("Get", 'GetNameСity', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//xhr.onreadystatechange = ...;

xhr.send(body);
*/