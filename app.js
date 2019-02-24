
function getJSON(url) {

    return new Promise(function (resolve, reject) {

        const request = new XMLHttpRequest();

        request.open("GET", url);

        request.onload = function () {
            try {
                if(this.status == 200 ){

                    resolve(JSON.parse(this.response));
                } else {

                    reject(this.status + " " + this.statusText);
                }
            } catch(e){
                reject(e.message);
            }
        };


        request.onerror = function () {
            reject(this.status + " " + this.statusText);
        };


        request.send();
    });
};

// Получаем JSON объекты с помощью промисов
const p1 = getJSON("package.json");
const p2 = getJSON("tsconfig.json");


// перебираем массив промисов
Promise.all([p1, p2]).then(values => {
    console.log(values[0]);
    console.log(values[1]);
    console.log("done")
}, function(reason) {
    console.log("reason", reason);
});