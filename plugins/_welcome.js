import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/h1eizu.jpg';

  if (chat.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `┏━〔 *ʙɪᴇɴᴠᴇɴɪᴅᴏ/ᴀ* 〕━┓
┃ Usuario: ${taguser}
┃ Grupo: *${groupMetadata.subject}*
┃
┃ ✨ ¡Pásala genial con todos!
┃ 💖 ${groupDesc}
┗━━━━━━━━━━━━━━━━━━┛`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `┏━〔 *ʜᴀꜱᴛᴀ ʟᴜᴇɢᴏ* 〕━┓
┃ Usuario: ${taguser}
┃ Grupo: *${groupMetadata.subject}*
┃
┃  ¡Te extrañaremos xd!
┗━━━━━━━━━━━━━━━━━━┛`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }
  }

  return true
}
