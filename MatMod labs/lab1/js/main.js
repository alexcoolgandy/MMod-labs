//Основная функция, запускается по кнопке
function main(){
    var resultMidSquares = midSquares(),
        resultMultiplicativeCongruen = multiplicativeCongruen(),
        arrRandomsNumbers = generateRandomNumbers(50000),
        resultCorrelationCoef = correlationCoef(arrRandomsNumbers),
        sortRandomNumbersByDiapazons = sortByDiapazons(arrRandomsNumbers, 0, 1);

    console.log('Результат метода середины квадратов ', resultMidSquares);
    console.log('Результат мультипликативного конгруэнтного метода ', resultMultiplicativeCongruen);
    console.log('Коэффициент корреляции = ', resultCorrelationCoef);

    drawChart(sortRandomNumbersByDiapazons);
}
// Функция построения графика
function drawChart(arr){
        var gistogramma = document.getElementById('gistogramma').getContext('2d');
        var barData = {
            labels : arr,
            datasets : [
                {
                    fillColor : "red",
                    strokeColor : "blue",
                    data : arr
                }

            ]
        };
        new Chart(gistogramma).Bar(barData);
}
// Реализация метода середины квадратов
function midSquares () {
    value = prompt('Введите начальное число', 1994);
    var arrOneMethod = [];
    for (var i = 1; i <= 10; i++ ) {
        var stringValue = value;
        stringValue = String(stringValue*stringValue);
        while (stringValue.length < 8) {
            stringValue = 0 + stringValue;
        }
        value = parseInt(stringValue.substring(2,6));
        arrOneMethod.push(value);
    }

    return arrOneMethod;
}
// Реализация Мультипликативного Конгуэртного метода
function multiplicativeCongruen (){
    var a = [],
        m = 13,
        k = 7,
        z = [],
        b = [];

        a.push(prompt('Введите A[0]', 1));

    for (i = 1; i<m-1; i++)
    {
        a[i] = (k*a[i-1]%m);
        z[i-1] = a[i]/m;
        b[i-1] = z[i-1];
    }

    return b;
}
// Расчет корреляционного коэфициента для массива СВ
function correlationCoef(arr) {
    var n = arr.length,
        sum = 0,
        i;

    for ( i = 0; i < n - 2; i++) {
        sum = sum + arr[i] * arr[i + 2];
    }

    return (1.0 / (12 * n - 2) * sum);
}
// Генерация СВ
function generateRandomNumbers(quantity) {
    var arrRandomNumbers = [];
    for (var i = 0; i < quantity; i++){
        arrRandomNumbers.push(Math.random());
    }

    return arrRandomNumbers;
}
// Сортировка по диапазонам для графика
function sortByDiapazons(arr, a, b) {
    var c = b - a,
        lengths = arr.length,
        min,
        arrByDiapazons = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        segment = c/20,
        i,
        j;
    for ( i = 0; i < lengths; i++) {
        min = a;
        for ( j = 0; j < 20; j++){
            if (arr[i] >= min && arr[i] <= min + segment) {
                arrByDiapazons[j]++;
            }
            min += segment;
        }
    }

    return arrByDiapazons;
}
