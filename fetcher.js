const url = process.argv[2];
const filePath = process.argv[3];
const request = require('request');
const fs = require('fs');


request(url,(error, response, body) => {
  if (error) {
    console.log(`Error in url: ${error}`);
  } else {
    const text = `error: ${error}\n statusCode: ${response && response.statusCode}\n body: ${body} `;
 
    fs.access(filePath, (err) => {
      if (err) {
          console.log("The file does not exist.");
      } else {
        fs.writeFile(filePath, text , function (err) {
          if (err) {
            throw err;
          } else {
            
              let stats = fs.statSync(filePath);
              let fileSizeInB = stats["size"];
              console.log(`Downloaded and saved ${fileSizeInB} bytes to ${filePath} `);
          }
         
        });
      }
    });
  }
 
  
});

