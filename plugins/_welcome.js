//© código creado por Deylin 
//https://github.com/Deylin-eliac 
//➤  no quites creditos 

import { WAMessageStubType } from '@whiskeysockets/baileys'


export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return;
  if (m.chat === "120363402481697721@g.us") return;

  let who = m.messageStubParameters[0];
  let taguser = `@${who.split("@")[0]}`;
  let chat = global.db.data.chats[m.chat];
  let totalMembers = participants.length;
  let ppUser = 'https://files.catbox.moe/h1eizu.jpg';

  try {
    ppUser = await conn.profilePictureUrl(who, 'image');
  } catch (e) {
    
  }

  let frasesBienvenida = [
    "¡Pika Pika! Bienvenido al grupo.",
    "¡Un rayo de energía ha llegado al grupo!",
    "Pikachu dice que este grupo ahora es 100% más eléctrico ⚡",
    "¡Esperamos que la pases genial, entrenador!",
    "Bienvenido al equipo, ¡que empiece la aventura Pokémon!"
  ];
  let frasesDespedida = [
    "Pikachu te dice adiós con una descarga de cariño.",
    "Otro entrenador deja el grupo... ¡Buena suerte!",
    "¡Hasta la próxima, no olvides tus Pokéballs!",
    "El grupo se queda con menos voltaje ⚡",
    "Pikachu te extrañará 🥺"
  ];

  let fraseRandomBienvenida = frasesBienvenida[Math.floor(Math.random() * frasesBienvenida.length)];
  let fraseRandomDespedida = frasesDespedida[Math.floor(Math.random() * frasesDespedida.length)];

  if (chat.welcome) {
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `
*💖─『 𝑩𝑰𝑬𝑵𝑽𝑬𝑵𝑰𝑫𝑶/𝑨 』─✨*
👤 *Usuario:* ${taguser}
💬 *Grupo:* *${groupMetadata.subject}*
👥 *Miembros:* *${totalMembers + 1}*
📅 *Fecha:* *${date}*
⚡ *Mensaje:* ${fraseRandomBienvenida}
      `.trim();

      await conn.sendMessage(m.chat, {
        image: { url: ppUser },
        caption: bienvenida,
        mentions: [who]
      });
    }

    if (
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
    ) {
      let despedida = `
*💖──『 𝑫𝑬𝑺𝑷𝑬𝑫𝑰𝑫𝑨 』──✨*
👤 *Usuario:* ${taguser}
💬 *Grupo:* *${groupMetadata.subject}*
👥 *Miembros:* *${totalMembers - 1}*
📅 *Fecha:* *${date}*
⚡ *Mensaje:* ${fraseRandomDespedida}
      `.trim();

      await conn.sendMessage(m.chat, {
        image: { url: ppUser },
        caption: despedida,
        mentions: [who]
      });
    }
  }
}
