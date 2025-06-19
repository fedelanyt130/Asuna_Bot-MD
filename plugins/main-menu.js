import { xpRange } from '../lib/levelling.js'
import ws from 'ws'

const tags = {
  'anime': 'ANIME',
  'juegos': 'JUEGOS',
  'main': 'INFO',
  'ia': 'IA',
  'search': 'SEARCH',
  'game': 'GAME',
  'serbot': 'SUB BOTS',
  'rpg': 'RPG',
  'sticker': 'STICKER',
  'group': 'GROUPS',
  'nable': 'ON / OFF',
  'premium': 'PREMIUM',
  'downloader': 'DOWNLOAD',
  'tools': 'TOOLS',
  'fun': 'FUN',
  'nsfw': 'NSFW',
  'cmd': 'DATABASE',
  'owner': 'OWNER',
  'audio': 'AUDIOS',
  'advanced': 'ADVANCED',
  'weather': 'WEATHER',
  'news': 'NEWS',
  'finance': 'FINANCE',
  'education': 'EDUCATION',
  'health': 'HEALTH',
  'entertainment': 'ENTERTAINMENT',
  'sports': 'SPORTS',
  'travel': 'TRAVEL',
  'food': 'FOOD',
  'shopping': 'SHOPPING',
  'productivity': 'PRODUCTIVITY',
  'social': 'SOCIAL',
  'security': 'SECURITY',
  'custom': 'CUSTOM'
}

let handler = async (m, { conn }) => {
  try {
    const userId = m.mentionedJid?.[0] || m.sender
    const user = global.db.data.users[userId]
    const name = await conn.getName(userId)
    const mode = global.opts["self"] ? "Privado" : "Público"
    const totalCommands = Object.keys(global.plugins).length
    const totalreg = Object.keys(global.db.data.users).length
    const uptime = clockString(process.uptime() * 1000)

    const users = [...new Set((global.conns || []).filter(conn => conn.user && conn.ws?.socket?.readyState !== ws.CLOSED))]

    const { exp, level } = user
    const { min, xp, max } = xpRange(level, global.multiplier)

    const help = Object.values(global.plugins).filter(p => !p.disabled).map(p => ({
      help: Array.isArray(p.help) ? p.help : (p.help ? [p.help] : []),
      tags: Array.isArray(p.tags) ? p.tags : (p.tags ? [p.tags] : []),
      limit: p.limit,
      premium: p.premium
    }))

    let menuText = `
╭══❒〔 𝗔𝗦𝗨𝗡𝗔𝗕𝗢𝗧-𝗔𝗜 〕══❒
│ 🧃 *Usuario:* @${userId.split('@')[0]}
│ ⚡ *Tipo:* ${(conn.user.jid === global.conn.user.jid ? 'Principal 🅥' : 'Prem Bot 🅑')}
│ 🌐 *Modo actual:* ${mode}
│ 👥 *Usuarios registrados:* ${totalreg}
│ ⏱️ *Tiempo activo:* ${uptime}
│ 💾 *Comandos:* ${totalCommands}
│ 🤖 *Sub-Bots activos:* ${users.length}
╰═════════════════❒
✨ *LISTA DE COMANDOS* ✨
${readMore}
`

    for (let tag in tags) {
      const comandos = help.filter(menu => menu.tags.includes(tag))
      if (comandos.length === 0) continue

      menuText += `\n╭─💖 *${tags[tag]}* ${getRandomEmoji()}\n`
      menuText += comandos.map(menu => menu.help.map(cmd =>
        `│ ✦ ${cmd}${menu.limit ? ' ◜💙◞' : ''}${menu.premium ? ' ◜🪪◞' : ''}`
      ).join('\n')).join('\n')
      menuText += `\n╰───────────────╯`
    }

    menuText += `\n\n*👑 © 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆 𝗳𝗲𝗱𝗲𝗹𝗮𝗻𝗬𝗧 🖥️ - ${botname}*`

    const imageUrl = 'https://files.catbox.moe/h1eizu.jpg'
    await m.react('👑')

    await conn.sendMessage(m.chat, {
      text: menuText,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          newsletterName: channelRD.name,
          serverMessageId: -1,
        },
        forwardingScore: 999,
        externalAdReply: {
          title: textbot,
          body: dev,
          thumbnailUrl: imageUrl,
          sourceUrl: redes,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m })

  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}


handler.help = ['menu', 'menú'];
handler.tags = ['main'];
handler.command = ['menú', 'menu']; 

export default handler

// Extras
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function getRandomEmoji() {
  const emojis = ['👑', '🔥', '🌟', '⚡']
  return emojis[Math.floor(Math.random() * emojis.length)]
}
