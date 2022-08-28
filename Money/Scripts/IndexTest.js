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
        


    });

const promise1 = fetch('/Home/GetNameBank');
const promise2 = fetch('/Home/GetNameBankStreet');

Promise.allSettled([promise1, promise1]).
    then(
        (results) => results.forEach((result) => {


            
            var t = JSON.stringify(result.value);
            console.log("******* = " + result.status + "     " + result.status + "  +++ " + t);
        })
    );

Promise.race([promise1, promise2])
    .then(response => {

        response.json().then(data => {
            console.log('===qqqdata', data);
            var bank = document.querySelector("#bank");
            bank.textContent = data;
            //bank
        })
    })
    .catch(function (error) {
        console.log('error', error)
    });

var promise = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Home/GetNameBankStreet');
    xhr.onload = function () {
        if (xhr.status == 200) {
            resolve(xhr.response);
        } else {
            reject(Error(xhr.statusText));
        }
    };
    xhr.onerror = function () {
        reject(Error('error fetching JSON data'));
    };
    xhr.send();
});


promise.then(function (data) {
    console.log("ttttttttttttttt"+JSON.parse(data));
}, function (error) {
    console.log(error);
});

