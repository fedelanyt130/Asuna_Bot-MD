
import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*${xsticker} Por favor, ingresa un texto para realizar tu sticker.*\n> *\`Ejemplo:\`* ${usedPrefix + command} Hello Word`, m, rcanal)
  }

  m.react('⏳')

  try {
    let url = `https://api.nekorinn.my.id/maker/bratvid?text=${encodeURIComponent(text)}`
    let res = await axios.get(url, { responseType: 'arraybuffer' })
    let contentType = res.headers['content-type']
    if (!contentType || !contentType.startsWith('video/')) throw new Error('Error en la API.')

    let bratSticker = await sticker(res.data, null, global.packname, global.author)

    await conn.sendMessage(m.chat, { sticker: bratSticker }, { quoted: m })
    m.react('✅')
  } catch (err) {
    console.error(err)
    m.react('✖️')
    m.reply(`✖️ Error: ${err.message}`)
  }
}

handler.help = ['bratvid <texto>']
handler.command = ['bratvid', 'bratv']
handler.tags = ['sticker']

export default handler
