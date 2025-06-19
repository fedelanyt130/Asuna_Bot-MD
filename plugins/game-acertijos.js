import fs from 'fs'

let handler = async (m, { conn, command }) => {
  global.acertijosActivos = global.acertijosActivos || {}

  if (command === 'acertijo') {
    let acertijos = JSON.parse(fs.readFileSync('./src/database/acertijos.json'))
    let acertijo = acertijos[Math.floor(Math.random() * acertijos.length)]

    await conn.reply(m.chat, `🧠 *Adivina este acertijo:*\n\n${acertijo.question}\n\n_Responde con la respuesta, no es necesario citar el mensaje._`, m, rcanal)

    global.acertijosActivos[m.sender] = {
      acertijo,
      intentos: 2,
      responded: false
    }
    return
  }
}

handler.before = async (m, { conn }) => {
  global.acertijosActivos = global.acertijosActivos || {}

  let juego = global.acertijosActivos[m.sender]
  if (!juego || juego.responded) return

  let respuestaUsuario = m.text.trim().toLowerCase()
  let respuestaCorrecta = juego.acertijo.response.trim().toLowerCase()

  if (respuestaUsuario === respuestaCorrecta) {
    juego.responded = true
    delete global.acertijosActivos[m.sender]
    return conn.reply(m.chat, `✅ *¡Correcto!* ${m.name} lo ha adivinado: *${juego.acertijo.response}*`, m, { mentions: [m.sender] })
  } else {
    juego.intentos--
    if (juego.intentos <= 0) {
      juego.responded = true
      delete global.acertijosActivos[m.sender]
      return conn.reply(m.chat, `❌ *Incorrecto.*\nLa respuesta correcta era: *${juego.acertijo.response}*`, m)
    } else {
      return conn.reply(m.chat, `❌ *Incorrecto.* Te quedan ${juego.intentos} intento(s).`, m)
    }
  }
}

handler.help = ['acertijo']
handler.tags = ['juegos']
handler.command = ['acertijo']

export default handler