/***
MIT License

Copyright (c) 2017 Bruno Baère Pederassi Lomba de Araujo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
***/

var myChart;
var rolls = 5000;

function computeRolls(dice, amount) {
    var diceRolls = [];
    var diceValue = parseInt(dice) + 1;

    // Initializes the array
    for (var i = 0; i < rolls; ++i) {
        diceRolls[i] = 0
    }
    
    for (var i = 0; i < rolls; ++i) {
        for (var j = 0; j < amount; ++j) {
            diceRolls[i] += math.randomInt(1, diceValue);
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
        histogram[i] = 100*histogram[i]/rolls;
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
    
    myChart = new Chart(context, 
    {
        type: 'bar',
        data: {
            labels: resultLabels,
            datasets: [
            {
                label: 'Result Probability',
                data: histogram,
                borderWidth: 1
            },
            {
                label: 'Probability curve',
                data: histogram,
                cubicInterpolationMode: 'monotone',
                backgroundColor: 'rgba(1,0,0,0)',
                type: 'line'
            }
            ]
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
