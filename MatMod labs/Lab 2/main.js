function main() { //Основная функция, которая срабатывает по нажатию на кнопку
    var quantity = parseInt(document.getElementById('value').value),
        a = parseInt(document.getElementById('a').value),
        b = parseInt(document.getElementById('b').value),
        arrRandomNumbers = generateRandomNumbers(quantity, a, b),
        arrByDiapazon = sortByDiapazons(arrRandomNumbers, a, b),
        arrByFunctionRasp = convertToFunctionRasp(arrByDiapazon);


    drawCharts(arrByDiapazon, arrByFunctionRasp, arrByDiapazon);
}

function convertToFunctionRasp(arr) {
        var arrFunctionRasp = [0];
        for (i = 1; i < arr.length; i++) {
            arrFunctionRasp[i] = arrFunctionRasp[i-1] + arr[i];
        }
        return arrFunctionRasp;
}

function normalRasp(a, b) {
    var result = 0,
       i;
    for (i = 0; i < 5; i++){
       result += Math.random()*(b - a) + a;
    }
    return result/5;
    //return  (-1 * Math.log(Math.random() *(b -a) + a));
    }

function generateRandomNumbers(quantity,a,b) { //Функция генерации случайных чисел (число СВ, минимум диапазона, максимум диапазона)
    var arrRandomNumbers = [];
    for (var i = 0; i < quantity; i++){
        arrRandomNumbers.push(normalRasp(a, b));
    }
    return arrRandomNumbers;
}

function sortByDiapazons(arr, a, b) { //Фонкция для сортировки массива СВ по идапазонам
    var c = b - a,
        min,
        arrByDiapazons = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        segment = c/40,
        i,
        j;
    for ( i = 0; i < arr.length; i++) {
        min = a;
        for ( j = 0; j < 40; j++){
            if (arr[i] >= min && arr[i] <= min + segment) {
                arrByDiapazons[j]++;
            }
            min += segment;
        }
    }
    return arrByDiapazons;
}

function drawCharts(arrForGistogramma, arrForFunctionRasp, arrForDensity) { //Функция для рисования графиков
    var buyers = document.getElementById('buyers').getContext('2d');
    var buyerData = {
        labels : arrForFunctionRasp,
        datasets : [
            {
                fillColor: "white",
                strokeColor : "orange",
                pointColor : "yellow",
                pointStrokeColor : "black",
                data : arrForFunctionRasp
            }
        ]
    };
    new Chart(buyers).Line(buyerData);

    var gistogramma = document.getElementById("gistogramma").getContext("2d");
    var barData = {
        labels : arrForGistogramma,
        datasets : [
            {
                fillColor : "red",
                strokeColor : "blue",
                data : arrForGistogramma
            }

        ]
    };
    new Chart(gistogramma).Bar(barData);

    var buyers2 = document.getElementById('buyers2').getContext('2d');
    var buyerData = {
        labels : arrForDensity,
        datasets : [
            {
                fillColor : "white",
                strokeColor : "black",
                pointColor : "yellow",
                pointStrokeColor : "brown",
                data : arrForDensity
            }
        ]
    };
    new Chart(buyers2).Line(buyerData);
}