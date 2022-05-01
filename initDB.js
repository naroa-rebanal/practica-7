'use strict';

const { askUser } = require('./lib/utils');
const { mongoose, connectMongoose, Anuncio, Usuario } = require('./models');


const ANUNCIOS_JSON = './anuncios.json';
const USUARIOS_JSON = './usuarios.json';


main().catch(err => console.error('Error!', err));

async function main() {
  
  // Si buscáis en la doc de mongoose (https://mongoosejs.com/docs/connections.html),
  // veréis que mongoose.connect devuelve una promesa que podemos exportar en connectMongoose
  // Espero a que se conecte la BD (para que los mensajes salgan en orden)
  await connectMongoose; 

  const answer = await askUser('Are you sure you want to empty DB and load initial data? (no) ');
  if (answer.toLowerCase() !== 'yes') {
    console.log('DB init aborted! nothing has been done');
    return process.exit(0);
  }

  // Inicializar nuestros modelos
  const anunciosResult = await initAnuncios(ANUNCIOS_JSON);
  console.log(`\nAnuncios: Deleted ${anunciosResult.deletedCount}, loaded ${anunciosResult.loadedCount} from ${ANUNCIOS_JSON}`);


  //Usuarios

  await initUsuarios();

  // Cuando termino, cierro la conexión a la BD
  await mongoose.connection.close();
  console.log('\nDone.');
}

async function initAnuncios(fichero) {
  const { deletedCount } = await Anuncio.deleteMany();
  const loadedCount = await Anuncio.cargaJson(fichero);
  return { deletedCount, loadedCount };
}



async function initUsuarios() {
  // borrar los usuarios existentes
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios
  const usuarios = await Usuario.insertMany([
    {
      email: 'admin@example.com',
      password: await Usuario.hashPassword('1234'),
      rol: 'admin',
    },
    {
      email: 'user1@example.com',
      password: await Usuario.hashPassword('1234'),
      rol: 'user',
    }
  ]);
  console.log(`Creados ${usuarios.length} usuarios.`);
}