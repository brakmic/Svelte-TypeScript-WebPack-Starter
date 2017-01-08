
import 'jquery';
import 'bootstrap-loader';

require('datatables.net')(window, $);
require('datatables.net-bs')(window, $);
require('datatables.net-buttons')(window, $);
require('datatables.net-buttons/js/buttons.colVis.js')(window, $); // Column visibility
require('datatables.net-buttons/js/buttons.html5.js')(window, $);  // HTML 5 file export
require('datatables.net-buttons/js/buttons.flash.js')(window, $);  // Flash file export
require('datatables.net-buttons/js/buttons.print.js')(window, $);  // Print view button
require('datatables.net-colreorder')(window, $);
require('datatables.net-fixedcolumns')(window, $);
require('datatables.net-fixedheader')(window, $);
require('datatables.net-keytable')(window, $);
require('datatables.net-responsive')(window, $);
require('datatables.net-scroller')(window, $);
require('datatables.net-autofill')(window, $);
require('datatables.net-select')(window, $);
