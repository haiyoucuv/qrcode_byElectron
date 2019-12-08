// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const qr = require('qr-image');
const fs = require('fs');

let getQRBtn = document.getElementById('getQRBtn');
getQRBtn.addEventListener("click", getAndShowQRImg);

let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener("click", clearInput);

let textInput = document.getElementById('textInput');
let img = document.getElementById('img');

function getAndShowQRImg() {
    img.src = '';
    getQRImg(textInput.value).then(res => {
        console.log(res);
        img.src = res;
    });
}

function clearInput() {
    textInput.value = '';
}

const getQRImg = function (text) {
    // text = '哈哈哈';
    return new Promise((resolve, reject) => {
        let bufferArrs = [];
        let code = qr.image(text, {
            type: 'png'
        });
        // code.pipe(fs.createWriteStream('qrcode.png'));

        code.on('data', function (chunk) {
            bufferArrs.push(chunk);
        });

        code.on('end', function () {
            let buffer = Buffer.concat(bufferArrs);
            let base64str = Buffer.from(buffer, 'binary').toString('base64');
            resolve('data:image/jpeg;base64,' + base64str);
        });
    });
};