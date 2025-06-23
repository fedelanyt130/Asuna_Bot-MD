let handler = async (m, { conn, command, usedPrefix }) => {
let creadorID = '5491156178758@s.whatsapp.net'
let isInGroup = m.isGroup && (await conn.groupMetadata(m.chat)).participants.some(p => p.id === creadorID)

let numeroTexto = isInGroup ? `@${creadorID.split('@')[0]}` : `+5491156178758`

let creador = `👑 *ENCLACES OFC*

❐ *GRUPO OFC:*
https://chat.whatsapp.com/K0534XyhiHp3vm49GxKcC0
❐ *CANAL OFC*
https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31
❐ *CANAL DE REGISTROS:*
https://github.com/David-Chian
`

await conn.sendMessage(m.chat, {
  text: creador.trim(),
  contextInfo: {
    forwardingScore: 200,
    isForwarded: false,
    mentionedJid: isInGroup ? [creadorID] : [],
    externalAdReply: {
      showAdAttribution: true,
      renderLargerThumbnail: true,
      title: `🥷 Developer 👑`,
      body: packname,
      mediaType: 1,
      sourceUrl: redes,
      thumbnailUrl: imagen1
    }
  }
}, {
  quoted: fkontak
})

}
handler.help = ['cuentas']
handler.command = ['cuentas']
handler.register = true
handler.tags = ['main']

export default handler
