import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return m.reply(`╭━━〔 *❗ 𝙀𝙅𝙀𝙈𝙋𝙇𝙊 ❗* 〕━━⬣
┃ ✦ ${usedPrefix + command} Joji - Glimpse of Us
╰━━━━━━━━━━━━━━━━━━⬣`);

  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key }})

  let results = await yts(text)

  if (!results || !results.videos || results.videos.length === 0)
    return m.reply('❎ No se encontraron resultados en YouTube.')

  let tes = results.videos[0]
  const apiUrl = `https://www.apis-anomaki.zone.id/downloader/yta?url=${encodeURIComponent(tes.url)}`

  try {
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json.result || !json.result.data || !json.result.data.downloadURL)
      return m.reply('❎ No se pudo obtener el audio.')

    const { downloadURL } = json.result.data
    const mention = `@${m.sender.split('@')[0]}`

    const caption = `
╭━━〔 *📥 PLAY AUDIO* 〕━━⬣
┃ ✦ *Título:* ${tes.title}
┃ ✦ *Artista:* ${tes.author.name}
┃ ✦ *Duración:* ${tes.timestamp || tes.duration}
┃ ✦ *Publicado:* ${tes.ago}
╰━━━━━━━━━━━━━━━━━━⬣
⌬ *Enlace:* ${tes.url}
⌬ *Pedido por:* ${mention}
⌬ *Asuna_Bot-Al*
`.trim()

    await conn.sendMessage(m.chat, {
      image: { url: tes.thumbnail },
      caption,
      mentions: [m.sender]
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: downloadURL },
      mimetype: 'audio/mp4',
      fileName: `${tes.title}.mp3`,
      mentions: [m.sender]
    }, { quoted: m })

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})

  } catch (err) {
    console.error(`Error: ${err.message}`)
    await conn.sendMessage(m.chat, { react: { text: '❎', key: m.key }})
    await m.reply('❎ Error al obtener el audio. Intenta nuevamente.')
  }
}

handler.help = ['play *<texto>*']
handler.tags = ['downloader']
handler.command = /^(keni)$/i
handler.disable = false

export default handler
