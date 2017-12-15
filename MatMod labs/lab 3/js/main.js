function main() {
    var matrix = [
            ["Y/X", 7.2, 10, 12.8, "Pyi"],
            [0.8, 0.12, 0.04, 0.13, 0.29],
            [1.6, 0.22, 0.12, 0.13, 0.47],
            [2.4, 0.6, 0.09, 0.09, 0.24],
            ["Pxj", 0.4, 0.25, 0.35, 1]
        ],
        result,
        arrForCharts;

    result = calculationCharakteristik(matrix);
    arrForCharts = calculationForXandY(matrix);
    drawCharts(arrForCharts);

    console.table(result);
}

function calculationCharakteristik(matrix) {
    var MX = 0, 
        MX2 = 0,
        DX = 0,
        MY = 0,
        MY2= 0,
        DY = 0,
        MXY = 0,
        Kxy = 0,
        Rxy = 0, 
        sigmaX = 0,
        sigmaY = 0,
        arrCharakteristiks = [];

    for (var i = 1; i <= 3; i++){
        MX = MX + (matrix[0][i] * matrix[4][i]);
        MX2 = MX2 + ((matrix[0][i]*matrix[0][i]) * matrix[4][i]);
        MY = MY + (matrix[i][0] * matrix[i][4]);
        MY2 = MY2 + ((matrix[i][0]*matrix[i][0]) * matrix[i][4]);
    }

    DX = MX2 - (MX*MX);
    DY = MY2 - MY*MY;
    sigmaX = Math.sqrt(DX);
    sigmaY = Math.sqrt(DY);

    for (i = 1; i <= 3; i++){
        for (var j = 1; j<=3; j++){
            MXY = MXY + (matrix[i][0] * matrix[0][j] * matrix[i][j]);
        }
    }

    Kxy = MXY - MX*MY;
    Rxy = Kxy/(sigmaX*sigmaY);

    arrCharakteristiks.push(MX, MX2, DX, MY, MY2, DY, MXY, Kxy, Rxy, sigmaX, sigmaY);
    return(arrCharakteristiks);
}

function calculationForXandY(matrix) {
    var gistX = [],
        gistY = [],
        arrayXY = [],
        value = parseInt(document.getElementById("textvalue").value),
        statusY = 0,
        statusX = 0,
        statusXY = [0,0,0,0,0,0,0,0,0],
        arrForX = [0,0,0],
        arrForY = [0,0,0],
        rand = 0;

    for (i = 0; i < value; i++) {
        rand = Math.random();

        if (rand <= matrix[4][1]) {
            statusY = 1;
        }
        else if (rand <= matrix[4][2] + matrix[4][1] && rand > matrix[4][2]) {
            statusY = 2;
        }
        else {
            statusY = 3;
        }

        rand = Math.random();

        if (rand <= matrix[1][4]) {
            arrayXY.push([[matrix[4][statusY]],[matrix[1][4]]]);
            statusX = 1;
        }
        else if(rand <= matrix[2][4] + matrix[1][4] && rand > matrix[2][4]) {
            arrayXY.push([[matrix[4][statusY]],[matrix[2][4]]]);
            statusX = 2;
        }
        else {
            arrayXY.push([[matrix[4][statusY]],[matrix[3][4]]]);
            statusX = 3;
        }

        if (statusX == 1){
            if (statusY == 1){statusXY[0] += 1;}
            else if (statusY == 2){statusXY[1] += 1;}
            else {statusXY[2] += 1;}
        }
        if (statusX == 2){
            if (statusY == 1){statusXY[3] += 1;}
            else if (statusY == 2){statusXY[4] += 1;}
            else {statusXY[5] += 1;}
        }
        if (statusX == 3){
            if (statusY == 1){statusXY[6] += 1;}
            else if (statusY == 2){statusXY[7] += 1;}
            else {statusXY[8] += 1;}
        }
    }

    for (i=0; i < value; i++){
        if (arrayXY[i][0] == matrix[4][1]){
            arrForX[0] += 1;
        }
        else if(arrayXY[i][0] == matrix[4][2]){
            arrForX[1] += 1;
        }
        else {
            arrForX[2] += 1;
        }

        if (arrayXY[i][1] == matrix[1][4]){
            arrForY[0] += 1;
        }
        else if(arrayXY[i][1] == matrix[2][4]){
            arrForY[1] += 1;
        }
        else {
            arrForY[2] += 1;
        }

    }

    return [arrForX, arrForY, statusXY];
}

function drawCharts(arr) {
    var incomeX = document.getElementById("incomeX").getContext("2d");
    var barDataX = {
        labels : arr[0],
        datasets : [
            {
                fillColor : "#48A497",
                strokeColor : "#48A4D1",
                data : arr[0]
            }
        ]
    };
    new Chart(incomeX).Bar(barDataX);

    var incomeY = document.getElementById("incomeY").getContext("2d");
    var barDataY = {
        labels : arr[1],
        datasets : [
            {
                fillColor : "#48A497",
                strokeColor : "#48A4D1",
                data : arr[1]
            }

        ]
    };
    new Chart(incomeY).Bar(barDataY);

    var incomeXY = document.getElementById("incomeXY").getContext("2d");
    var barDataXY = {
        labels : arr[2],
        datasets : [
            {
                fillColor : "#48A497",
                strokeColor : "#48A4D1",
                data : arr[2]
            }

        ]
    };
    new Chart(incomeXY).Bar(barDataXY);
}


