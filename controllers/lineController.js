/**
 * Created by hassan.rizvi on 9/22/2016.
 */
var lineCtrl = app.controller('lineController', [function () {
    //Line
    Highcharts.chart('containerLine', {
        title: {
            text: 'Temperature Data Line'
        },

        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
        },

        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    });

}]);