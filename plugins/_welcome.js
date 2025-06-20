//© código creado por Deylin 
//https://github.com/Deylin-eliac 
//➤  no quites creditos 

import { WAMessageStubType } from '@whiskeysockets/baileys'

const paises = {
  "1": "🇺🇸 Estados Unidos", "34": "🇪🇸 España", "52": "🇲🇽 México", "54": "🇦🇷 Argentina",
  "55": "🇧🇷 Brasil", "56": "🇨🇱 Chile", "57": "🇨🇴 Colombia", "58": "🇻🇪 Venezuela",
  "591": "🇧🇴 Bolivia", "593": "🇪🇨 Ecuador", "595": "🇵🇾 Paraguay", "598": "🇺🇾 Uruguay",
  "502": "🇬🇹 Guatemala", "503": "🇸🇻 El Salvador", "504": "🇭🇳 Honduras", "505": "🇳🇮 Nicaragua",
  "506": "🇨🇷 Costa Rica", "507": "🇵🇦 Panamá", "51": "🇵🇪 Perú", "53": "🇨🇺 Cuba", "91": "🇮🇳 India"
};

function obtenerPais(numero) {
  let num = numero.replace("@s.whatsapp.net", "");
  let codigo = Object.keys(paises).find(pref => num.startsWith(pref));
  return paises[codigo] || "🌐 Desconocido";
}

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return;
  if (m.chat === "120363402481697721@g.us") return;

  let who = m.messageStubParameters[0];
  let taguser = `@${who.split("@")[0]}`;
  let chat = global.db.data.chats[m.chat];
  let totalMembers = participants.length;
  let date = new Date().toLocaleString("es-ES", { timeZone: "America/Mexico_City" });

  let pais = obtenerPais(who);
  let ppUser = 'https://files.catbox.moe/h1eizu.jpg';

  try {
    ppUser = await conn.profilePictureUrl(who, 'image');
  } catch (e) {
    
  }

  let frasesBienvenida = [
    "¡hola! Bienvenido al grupo.",
    "Bienvenido al grupo, ¡que empiece la aventura de los bots!",
  ];
  let frasesDespedida = [
    "Adiós nos vemos",
    "Hasta luego gay!",
  ];

  let fraseRandomBienvenida = frasesBienvenida[Math.floor(Math.random() * frasesBienvenida.length)];
  let fraseRandomDespedida = frasesDespedida[Math.floor(Math.random() * frasesDespedida.length)];

  if (chat.welcome) {
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `
*✩─『 ʙɪᴇɴᴠᴇɴɪᴅᴏ/ᴀ 』─✩*
👤 *Usuario:* ${taguser}
🌍 *País:* ${pais}
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
*✩──『 ʜᴀꜱᴛᴀ ʟᴜᴇɢᴏ 』──✩*
👤 *Usuario:* ${taguser}
🌏 *país:* ${pais}
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
