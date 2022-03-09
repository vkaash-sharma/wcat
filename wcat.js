// 1) node wcat.js filepath => displays the contents of a file in terminal
// 2) node wcat.js filepath1 filepath2 filepath3  => displays the content of all files in terminal in concatinated form in given order
//node wcat.js f1.txt
//node wcat.js f1.txt f2.txt f3.txt

const fs = require("fs");

let inputArr = process.argv.slice(2);

// console.log(inputArr);

let filesAr = [];

// place the file in filesAr;
for(let i = 0 ; i < inputArr.length ; i++ ){

    filesAr.push(inputArr[i]);
}

// check if all files are present or not

for(let i = 0 ; i < filesAr.length ; i++){

    let doesExist = fs.existsSync(filesAr[i]);
   
    if(!doesExist){
        console.log("The File Does Not exits");
        return;
    }

}

// content read and appending starts//

let content = "";

for(let i = 0 ; i< filesAr.length ; i++){
  
    let readContent = fs.readFileSync(filesAr[i]);
    content+=readContent+"\n";
}

console.log(content);

