import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  const namegrupo = 'Grupo Oficial'
  const gp1 = 'https://chat.whatsapp.com/KPbFD3ONgiY1OB2YJ5SDUt' // ← tu link real

  const namechannel = 'Canal del Bot'
  const channel = 'https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31' // ← tu canal real

  const dev = '💖 creador: @fedelanYT'
  const catalogo = 'https://files.catbox.moe/qs5m6d.jpg' // o './media/grupos.jpg'
  const emojis = '📡'

  let grupos = `
╭─⟪ *⚘ GRUPOS OFICIALES * 
│
│ ❐ *${namegrupo}*
│ ${gp1}
│
│ ❐ *${namechannel}*
│ ${channel}
│
│ ${dev}
╰─────────────────╯
`

  await conn.sendFile(m.chat, catalogo, 'grupos.jpg', grupos.trim(), m)
  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
