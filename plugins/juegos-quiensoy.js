// creador por brayan X clarita 
// https://github.com/El-brayan502 

const juegos = [
  {
    pregunta: '🐭 Soy un Pokémon eléctrico amarillo muy famoso',
    respuesta: 'pikachu'
  },
  {
    pregunta: '🕷️ Tengo poderes arácnidos y me llamo Peter Parker',
    respuesta: 'spiderman'
  },
  {
    pregunta: '🧙‍♂️ Soy un mago con una cicatriz en forma de rayo',
    respuesta: 'harry potter'
  },
  {
    pregunta: '🐉 Soy el saiyajin más fuerte y me encanta pelear',
    respuesta: 'goku'
  },
  {
    pregunta: '🍔 Trabajo en una tienda de comida rápida bajo el mar',
    respuesta: 'bob esponja'
  },
];

const handler = async (m, { conn }) => {
  const juego = juegos[Math.floor(Math.random() * juegos.length)];
  conn.juegoAct = conn.juegoAct || {};
  conn.juegoAct[m.chat] = {
    respuesta: juego.respuesta,
    timeout: setTimeout(() => {
      if (conn.juegoAct[m.chat]) {
        conn.reply(m.chat, `⏱️ Tiempo terminado. La respuesta correcta era: *${juego.respuesta}*`, m);
        delete conn.juegoAct[m.chat];
      }
    }, 30000)
  };
  await conn.reply(m.chat, `🎮 *¿Quién soy?*\n${juego.pregunta}\n\n_Tienes 30 segundos para responder..._`, m);
};

handler.before = async function (m, { conn }) {
  conn.juegoAct = conn.juegoAct || {};
  if (conn.juegoAct[m.chat] && m.text.toLowerCase() === conn.juegoAct[m.chat].respuesta.toLowerCase()) {
    clearTimeout(conn.juegoAct[m.chat].timeout);
    delete conn.juegoAct[m.chat];
    await conn.reply(m.chat, `🎉 ¡Correcto, ${m.pushName}!`, m);
  }
};

handler.command = /^quiensoy$/i;
handler.help = ['quiensoy'];
handler.tags = ['juegos'];
handler.register = true;

export default handler;