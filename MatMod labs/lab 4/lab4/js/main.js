function generate() {
    var doors = 3;
    var winDoor = randomDoors(doors);
    var choisePlayer = randomDoors(doors);

    do{
        var choiseComputer = randomDoors(doors);

        if (choiseComputer == choisePlayer) {
            if (choiseComputer == 1){
                choiseComputer =    2;
            }
            else if (choiseComputer == doors){
                choiseComputer = doors - 1;
            }
        }
    }
    while(choiseComputer == choisePlayer);


    var choisePlayerTwo = randomDoors(doors);

    do{
        var choisePlayerTwo = randomDoors(doors);
    }while(choisePlayerTwo == choisePlayer || choisePlayerTwo == choiseComputer)


    if (choisePlayerTwo == winDoor){
        return true;
    }
    else {
        return false;
    }
}

function randomDoors(doors){
    return Math.round(Math.random() * ((doors + 0.49) - 0.5) + 0.5);
}

function startSimulation() {
    var iteration = 10000;
    var result;
    var arrResult = [0,0];
    for (var i = 0; i < iteration; i++){
        result = generate();
        if (result){
            arrResult[0]++;
        }
        else{arrResult[1]++;}
    }
    console.log(arrResult[0]/iteration*100);
}