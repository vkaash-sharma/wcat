// 1) node wcat.js filepath => displays the contents of a file in terminal
// 2) node wcat.js filepath1 filepath2 filepath3  => displays the content of all files in terminal in concatinated form in given order
//node wcat.js f1.txt
//node wcat.js f1.txt f2.txt f3.txt

const fs = require("fs");

let inputArr = process.argv.slice(2);

// console.log(inputArr);

let filesAr = [];
let optionArr = [];

// place the file in filesAr;
for(let i = 0 ; i < inputArr.length ; i++ ){
   let firstChar = inputArr[i].charAt(0);
    if (firstChar == '-'){
        optionArr.push(inputArr[i]);
    }else{
    filesAr.push(inputArr[i]);
    }
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
    content+=readContent+"\r\n";
}

console.log(content);

let contentArr = content.split("\r\n");

// console.table(contentArr);

//  let check is -s is present in the array or not;

let isSPresent = optionArr.includes("-s");

if(isSPresent){

    for(let i = 1 ; i < contentArr.length ; i++ ){

        if(contentArr[i] == "" && contentArr[i-1]==""){
            contentArr[i] = null;
        }else if( contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i] = null;
        }
    }
}

// console.table(contentArr);
let tempArr = [];
for(let i = 0 ; i <contentArr.length ; i++ ){

    if (contentArr[i]!=null){
        tempArr.push(contentArr[i]);
    }
    contentArr = tempArr;
}
// console.table(tempArr);


let indexOfN = optionArr.indexOf("-n");
let indexOfB = optionArr.indexOf("-b");

// if we found -b and -n and we dont have -b and -n return -1;

let finalOption ="";

if (indexOfN!=-1 && indexOfB!=-1){

   if(indexOfN < indexOfB){
     finalOption = "-n";
    }else{
     finalOption = "-b";
    }
}
else{
  
    if(indexOfN!=1){
        finalOption = "-n";
    }else if(indexOfB!=-1){
        finalOption = "-b";
    }
}

if(finalOption == "-n"){

    modifycontentbyn();
}else{
    modifycontentbyb();
}



function modifycontentbyn(){

    for(let i = 0 ; i< contentArr.length ; i++){

        contentArr[i] = (i+ 1)+ ") "+contentArr[i];
    }
     
}

function modifycontentbyb(){

    let count = 1;
    for(let i = 0 ; i< contentArr.length ; i++){
   
        if(contentArr[i]!=""){
        contentArr[i] = count+ ") "+contentArr[i];
        count++;
        }
    }

}

console.log(contentArr);







