const schedule = require('node-schedule');
const fs = require('fs')

function scheduleCronstyle(){
    schedule.scheduleJob('10 * * * * *', function(){
        console.log('scheduleCronstyle:' + new Date());
        fs.unlink("./Scheduledtasks/test.js", (err => { 
            if (err) console.log(err); 
            else { 
              console.log("\nDeleted file:example_file.txt"); 
            } 
          })); 
    }); 
    
}
scheduleCronstyle();