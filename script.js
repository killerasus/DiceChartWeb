var myChart;

function computeRolls(dice, amount) {
    var diceRolls = [];

    // Initializes the array
    for (var i = 0; i < 1000; ++i) {
        diceRolls[i] = 0
    }
    
    for (var i = 0; i < 1000; ++i) {
        for (var j = 0; j < amount; ++j) {
            diceRolls[i] += math.randomInt(1, parseInt(dice) + 1);
        }
    }

    return diceRolls;
}

function computeHistogram(diceRolls) {
    var histogram = [];
    
    var diceTypeList = document.getElementById("dicetype");
    var diceType = diceTypeList.options[diceTypeList.selectedIndex].value;
    var minValue = document.getElementById("diceamount").value;
    var maxValue = minValue * diceType
    
    for (var i = minValue; i <= maxValue; ++i)
    {
        histogram[i] = 0
    }

    for (var i = 0; i < diceRolls.length; ++i) {
        histogram[diceRolls[i]]++;
    }
    
    //Normalizing
    for (var i = 0; i < histogram.length; ++i){
        histogram[i] = 100*histogram[i]/1000;
    }
    
    return histogram;
}

function generateChart() {
    var diceTypeList = document.getElementById("dicetype");
    var diceType = diceTypeList.options[diceTypeList.selectedIndex].value;
    var diceNumber = document.getElementById("diceamount").value;
    var diceRolls = computeRolls(diceType, diceNumber);
    var histogram = computeHistogram(diceRolls);
    
    // Creates chart labels based on dice thrown
    var resultLabels = [];
    for (var i = 0; i <= diceNumber * diceType; i++)
    {
        resultLabels.push( i.toString() );
    }
    
    var div = document.getElementById("chartdiv");
    var context = document.getElementById("DiceRollChart");
    
    // Cleans chart if already created
    if (myChart != null)
        myChart.destroy();
    
    myChart = new Chart(context, {
        type: 'bar',
        data: {
            labels: resultLabels,
            datasets: [{
                label: 'Result Probability',
                data: histogram,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true
        }
    });
}