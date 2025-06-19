async function handler(m, { conn, orgs, participants, groupMetadata }) {
  let group = m.chat;
  let totalMembers = participants.length;
  let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);
  conn.reply(m.chat, `*⚡🌩️──『 𝑳𝑰𝑵𝑲 𝑷𝑰𝑲𝑨𝑪𝑯𝑼 』──🌩️⚡*

📛 *Grupo:* ${groupMetadata.subject}
👥 *Miembros:* ${totalMembers}

🔗 *Enlace mágico:* 
${link}

🐭 ¡Pikachu dice que lo compartas con los mejores entrenadores! ⚡`,  m, { detectLink: true });
}

handler.help = ['link'];
handler.tags = ['grupo'];
handler.command = ['link', 'enlace'];
handler.group = true;
handler.botAdmin = true;

export default handler;