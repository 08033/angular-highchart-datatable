/**
 * Created by hassan.rizvi on 9/23/2016.
 */
var monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

//Converting source image to 64Bit Data:
function toDataUrl(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
    }
}

var dataTableCtrl = app.controller('dataTableController', ['DTOptionsBuilder', 'DTColumnBuilder', '$q', '$log', function (DTOptionsBuilder, DTColumnBuilder, $q, $log) {
    var vm = this;
    vm.tableName = 'Full Feature angular loaded table \n with Export, Column Selection, Pagination, Sort';

    vm.tableData = [{id: '1', name: 'Foo', text: 'Bar', detail: 'Detail is good', image: 'NA'}, {
        id: '123',
        name: 'Someone',
        text: 'Youknow',
        detail: 'Detail is ok'
        , image: 'PNG format'
    }, {id: '987', name: 'Iamout', text: 'Ofinspiration', detail: 'Detail is needed', image: 'JPEG supported only'}];

    vm.queueData = [{
        category: 'Checkbooks',
        serviceNum: '102',
        servicePer: '20%',
        waitingAvg: '00:10:20',
        waitingSLA: '30%',
        serviceAvg: '00:10:20',
        serviceSLA: '30%',
        noShowNum: '100',
        noShowPer: '30%'
    }, {
        category: 'Preferred cashier',
        serviceNum: '101',
        servicePer: '20%',
        waitingAvg: '00:10:20',
        waitingSLA: '30%',
        serviceAvg: '00:10:20',
        serviceSLA: '30%',
        noShowNum: '102',
        noShowPer: '50%'
    }, {
        category: 'Executive vip',
        serviceNum: '104',
        servicePer: '30%',
        waitingAvg: '00:10:20',
        waitingSLA: '30%',
        serviceAvg: '00:10:20',
        serviceSLA: '30%',
        noShowNum: '103',
        noShowPer: '30%'
    },
        {
            category: '1 to 4 movements',
            serviceNum: '100',
            servicePer: '25%',
            waitingAvg: '00:10:20',
            waitingSLA: '50%',
            serviceAvg: '00:10:20',
            serviceSLA: '60%',
            noShowNum: '101',
            noShowPer: '20%'
        }
        , {
            category: 'Regular executive',
            serviceNum: '105',
            servicePer: '40%',
            waitingAvg: '00:10:20',
            waitingSLA: '30%',
            serviceAvg: '00:10:20',
            serviceSLA: '30%',
            noShowNum: '104',
            noShowPer: '30%'
        }, {
            category: 'Cheques',
            serviceNum: '100',
            servicePer: '50%',
            waitingAvg: '00:10:20',
            waitingSLA: '30%',
            serviceAvg: '00:10:20',
            serviceSLA: '40%',
            noShowNum: '100',
            noShowPer: '40%'
        }];


    //Options and Columns
    //fromSource('https://l-lin.github.io/angular-datatables/data.json')
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            var defer = $q.defer();
            defer.resolve(vm.queueData);
            return defer.promise;
        })
        .withPaginationType('full_numbers')
        .withOption('responsive', true)
        .withBootstrap()
        .withBootstrapOptions({
            TableTools: {
                classes: {
                    container: 'btn-group',
                    buttons: {
                        normal: 'btn btn-danger'
                    }
                }
            },
            ColVis: {
                classes: {
                    masterButton: 'btn btn-primary'
                }
            },
            pagination: {
                classes: {
                    ul: 'pagination pagination-sm'
                }
            }// Add ColVis compatibility
        })// Active Buttons extension
        .withButtons([
            {
                extend: 'excel',
                title: 'Data export excel'
            },
            {
                extend: 'pdfHtml5',
                title: 'Summary',
                customize: function (doc) {
                    console.log(doc);

                    //Images supported: png, jpg
                    // a string or { width: number, height: number }
                    doc.pageSize = 'A4';
                    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
                    //doc.pageMargins = [10, 10, 10, 10];

                    var d = new Date();
                    var leftHeader = d.getDate() + '/' + monthNames[d.getMonth()] + '/' + d.getFullYear();

                    var headerCols = [];
                    headerCols[0] = {text: leftHeader, alignment: 'left', fontSize: 8, margin: [20, 10, 0, 0]};
                    headerCols[1] = {text: 'Summary', alignment: 'left', fontSize: 8, margin: [-15, 10, 0, 0]};
                    var objHeader = {};
                    objHeader['columns'] = headerCols;
                    doc['header'] = objHeader;


                    doc['footer'] = function (currentPage, pageCount) {
                        var cols = [];

                        cols[0] = {
                            text: 'Tickets Served/Issued \n 355/808(44.04%)',
                            alignment: 'left',
                            margin: 20,
                            fontSize: 8
                        };
                        cols[1] = {
                            text: 'Waiting time \n Avg:01:17:23 | SLA:66.2%',
                            alignment: 'left',
                            margin: 20,
                            fontSize: 8
                        };
                        cols[2] = {
                            text: 'Service time \n Avg:00:00:57 | SLA:91.55%',
                            alignment: 'left',
                            margin: 20,
                            fontSize: 8
                        };
                        cols[3] = {text: 'No Show \n 39(4.84%)', alignment: 'left', margin: 20, fontSize: 8};
                        cols[4] = {
                            text: currentPage.toString() + '/' + pageCount,
                            alignment: 'right',
                            fontSize: 8,
                            margin: [20, 20]
                        };
                        var objFooter = {};
                        objFooter['columns'] = cols;
                        return objFooter;

                        /*return {
                         text: currentPage.toString() + '/' + pageCount,
                         alignment: 'right',
                         fontSize: 8,
                         margin: [20, 20]
                         };*/
                    };


                    /*var canvas = document.createElement("canvas");
                     var ctx = canvas.getContext('2d');
                     var dataURL;
                     canvas.height = this.height;
                     canvas.width = this.width;
                     ctx.drawImage(this, 0, 0);
                     dataURL = canvas.toDataURL(base64Img);
                     var fullQuality = canvas.toDataURL("image/png", 1.0);*/

                    //app/images/ngwavetecLogo.png

                    /*var dataUrl = '';
                     toDataUrl('app/images/ngwavetecLogo.png', function (base64Img) {
                     console.log(base64Img);
                     dataUrl = base64Img;
                     });*/

                    doc.content.splice(0, 0,
                        {
                            margin: [0, 0, 0, 0],
                            alignment: 'left',
                            width: 78,
                            height: 15,
                            image: 'data:image/png;base64,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'
                        }
                    );


                    var subTitleCols = [];
                    subTitleCols[0] = {
                        text: 'Service performance',
                        alignment: 'center',
                        margin: [0, 0, 0, 5],
                        fontSize: 10,
                        color: 'gray'
                    };
                    subTitleCols[1] = {
                        text: '27 ago.2016 - 26 sept.2016 | Los Angeles - Phoenix - New York',
                        alignment: 'center',
                        margin: [0, 5, 0, 20],
                        fontSize: 10,
                        color: 'gray'
                    };

                    doc.content.splice(2, 0, subTitleCols[0]);
                    doc.content.splice(3, 0, subTitleCols[1]);

                    doc.styles.tableBodyOdd = {fontSize: 6};
                    doc.styles.tableBodyEven = {fontSize: 6};
                    doc.styles.tableHeader = {fontSize: 7, margin: [0, 15], fillColor: '', color: '#000', bold: true};

                    doc.content[4].table.widths = '*';
                    doc.content[4].table.headerRows = 2;

                    doc.content[4].layout = {
                        hLineWidth: function (i, node) {
                            return (i === 0 || i === node.table.body.length) ? 1 : 1;
                        },
                        vLineWidth: function (i, node) {
                            return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                        },
                        hLineColor: function (i, node) {
                            return (i === 0 || i === node.table.body.length) ? '#eee' : '#eee';
                        },
                        vLineColor: function (i, node) {
                            return (i === 0 || i === node.table.widths.length) ? '#eee' : '#eee';
                        }
                    };


                }
            },
            {
                extend: 'csv',
                title: 'Data export csv'
            },
            'colvis',
            'copy',
            'print'
            /*,
             'excel',
             'pdfHtml5',
             'csv'*/
        ]);

    vm.dtColumns = [
        /*DTColumnBuilder.newColumn('id').withTitle('ID'),
         DTColumnBuilder.newColumn('firstName').withTitle('First name'),
         DTColumnBuilder.newColumn('lastName').withTitle('Last name')*/

        /*DTColumnBuilder.newColumn('id').withTitle('ID'),
         DTColumnBuilder.newColumn('name').withTitle('First name'),
         DTColumnBuilder.newColumn('text').withTitle('Last name'),
         DTColumnBuilder.newColumn('detail').withTitle('Detail'),
         DTColumnBuilder.newColumn('image').withTitle('Image')*/

        DTColumnBuilder.newColumn('category').withTitle('Category'),
        DTColumnBuilder.newColumn('serviceNum').withTitle('Ticket Served #'),
        DTColumnBuilder.newColumn('servicePer').withTitle('Ticket Served %'),
        DTColumnBuilder.newColumn('waitingAvg').withTitle('Waiting time Avg.'),
        DTColumnBuilder.newColumn('waitingSLA').withTitle('Waiting time SLA'),
        DTColumnBuilder.newColumn('serviceAvg').withTitle('Service time Avg.'),
        DTColumnBuilder.newColumn('serviceSLA').withTitle('Service time SLA'),
        DTColumnBuilder.newColumn('noShowNum').withTitle('No show #'),
        DTColumnBuilder.newColumn('noShowPer').withTitle('No show %')
    ];

}]);
