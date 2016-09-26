/**
 * Created by hassan.rizvi on 8/26/2016.
 */
var app = angular.module('Angular101', ['ngRoute','datatables','datatables.bootstrap','datatables.buttons']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        template: '<h2>LineChart</h2><div id="containerLine"></div>',
        controller: 'lineController'
    }).when('/lineChart', {
        template: '<h2>LineChart</h2><div id="containerLine"></div>',
        controller: 'lineController'
    }).when('/barChart', {
        template: '<h2>BarChart</h2><div id="containerBar"></div>',
        controller: 'barController'
    }).when('/stackedChart', {
        template: ' <h2>StackedChart</h2><div id="containerStacked"></div>',
        controller: 'stackedController'
    }).when('/pieChart', {
        template: '<h2>PieChart</h2><div id="containerPie"></div>',
        controller: 'pieController'
    }).when('/multiAxisChart', {
        template: '<h2>Mutliple Axis Chart</h2><div id="containerMulti"></div>',
        controller: 'multiAxisController'
    }).when('/drillDownChart', {
        template: '<h2>Drill down Chart</h2><div id="containerDrilldown"></div>',
        controller: 'drillDownController'
    }).when('/dataTable', {
        templateUrl: 'app/directives/dataTable.html',
        controller: 'dataTableController'
    });
});