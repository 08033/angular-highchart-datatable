/**
 * Created by hassan.rizvi on 9/23/2016.
 */

var dataTableCtrl = app.controller('dataTableController', ['DTOptionsBuilder', 'DTColumnBuilder', function (DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.tableName = 'Full Feature angular loaded table \n with Export, Column Selection, Pagination, Sort';

    vm.tableData = [{id: '1', name: 'Foo', text: 'Bar', detail: 'Detail is good', image: 'NA'}, {
        id: '123',
        name: 'Someone',
        text: 'Youknow',
        detail: 'Detail is ok'
        , image: 'PNG format'
    }, {id: '987', name: 'Iamout', text: 'Ofinspiration', detail: 'Detail is needed', image: 'JPEG supported only'}];

    //Options and Columns
    vm.dtOptions = DTOptionsBuilder.fromSource('https://l-lin.github.io/angular-datatables/data.json').withPaginationType('full_numbers')
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
            'colvis',
            'copy',
            'print',
            'excel',
            'pdfHtml5',
            'csv'
        ]);
    //.withOptions('responsive', true);

    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name')

        /*DTColumnBuilder.newColumn('id').withTitle('ID'),
         DTColumnBuilder.newColumn('name').withTitle('First name'),
         DTColumnBuilder.newColumn('text').withTitle('Last name'),
         DTColumnBuilder.newColumn('detail').withTitle('Detail'),
         DTColumnBuilder.newColumn('image').withTitle('Image')*/
    ];

}]);