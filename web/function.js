window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};
var randomScalingFactor = function() {
    return parseInt(Math.random() * 100,10);
};

var config = {
    type: 'line',
    data: {
        labels: [1,2,3,4,5],
        datasets: []
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: '타자 연습 타수 / 정확도'
        },
        scales: {
            xAxes: [{
                display: true,
            }],
            yAxes: [{
                ticks: {
                    max: 100,
                    min: 0,
                    stepSize: 10
                },
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'y-axis-1',
            }, {
                ticks: {
                    min: 0,
                    stepSize: 50
                },
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'right',
                id: 'y-axis-2',

                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
    }
};




