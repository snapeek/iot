var log = console.log;
var mb = require('modbus').create();

// create device memory map
var data = mb.createData({ countReg: 8, countBit: 2 });
data.setReg(2, 321);
data.setReg(3, 321);
data.setBit(1, true);
data.dumpData(); // show memory map

// create slave device
var ctxIn = mb.createSlave({

  // connection type and params
  con: mb.createConTcp('127.0.0.1', 1502),
  //con: mb.createConRtu(1, '/dev/ttyS0', 9600),
  
  // data map
  data: data,

  // callback functions
  onQuery: function () {
    log('onQuery', mb.query());
    //ctx.dumpData();
    // log(ctxIn.getBits(0, 2));
  },
  onDestroy: function () {
    log('onDestroy');
  }
});

// var ctxOut = mb.createSlave({
  
//   // connection type and params
//   con: mb.createConTcp('127.0.0.1', 1503),
//   //con: mb.createConRtu(1, '/dev/ttyS0', 9600),
  
//   // data map
//   data: data,

//   // callback functions
//   onQuery: function () {
//     log('onQuery', mb.query());
//     //ctx.dumpData();
//     log(ctxOut.getBits(0, 2));
//   },
//   onDestroy: function () {
//     log('onDestroy');
//   }
// });