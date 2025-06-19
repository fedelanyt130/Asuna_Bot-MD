let handler = async (m, { conn, args, usedPrefix, command }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => icono) 
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'on': 'not_announcement',
'off': 'announcement',
}[(args[0] || '')]
if (isClose === undefined)
return conn.reply(m.chat, `⚡🐭 *¡Pikachu necesita una orden para cambiar el grupo!*\n\nEjemplo:\n*⚡ #${command} on*\n*⚡ #${command} off*\n*⚡ #${command} close*\n*⚡ #${command} open*`, m, rcanal)
await conn.groupSettingUpdate(m.chat, isClose)

if (isClose === 'not_announcement'){
return conn.reply(m.chat,`🟢✨ *¡Pikachu usó Impactrueno! El grupo ha sido abierto, todos pueden hablar.*`, m, rcanal)
}

if (isClose === 'announcement'){
return conn.reply(m.chat, `🔒⚠️ *¡Pikachu usó Rayo! Solo los entrenadores (admins) pueden hablar en este grupo.*`, m, rcanal)
}}
handler.help = ['group open / close', 'grupo on / off']
handler.tags = ['grupo']
handler.command = ['group', 'grupo']
handler.admin = true
handler.botAdmin = true;

export default handler