'use strict';

const { Responder } = require('cote');
const Jimp = require('jimp');


const imagesPath = './public/images/anuncios/';


const responder = new Responder({name: 'Thumnails maker'});

responder.on('make-thumbnail', (req, done) =>{
    const { imageName } = req;

    const completeImg = `${imagesPath}${imageName}`;

    Jimp.read(completeImg, (err, img) =>{
        if(err) throw err;
        img
        .resize(100, 100)
        .write(`${imagesPath}thumb-${imageName}`);            
    })


    const resultado = `thumb-${imageName}`;

    done(resultado);

});