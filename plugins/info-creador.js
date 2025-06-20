// Código creado por Deylin
// https://github.com/Deylin-eliac 
// codigo creado para https://github.com/Deylin-eliac/Pikachu-bot 
// No quites créditos

import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  m.react('👤');
  
const imageUrl = 'https://files.catbox.moe/hmvsyj.jpg'
  const numCreador = '5491156178758';
  const ownerJid = numCreador + '@s.whatsapp.net';
  const name = await conn.getName(ownerJid) || 'Fede';
  const about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || `һ᥆ᥣᥲ¡ s᥆ᥡ 𝖿ᥱძᥱ mᥙᥴһ᥆ gᥙs𝗍᥆.`;
  const empresa = 'fede - Servicios Tecnológicos';

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa};
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:correo@empresa.com
URL:https://www.tuempresa.com
NOTE:${about}
ADR:;;Dirección de tu empresa;;;;
X-ABADR:ES
X-ABLabel:Dirección Web
X-ABLabel:Correo Electrónico
X-ABLabel:Teléfono de contacto
X-WA-BIZ-NAME:${name}
X-WA-BIZ-DESCRIPTION:${about}
END:VCARD`.trim();


  await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: name,
        contacts: [{ vcard }]
      },
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          newsletterName: channelRD.name,
          serverMessageId: -1,
        },
        externalAdReply: {
          title: textbot,
          body: dev,
          thumbnailUrl: imageUrl,
          sourceUrl: redes,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true,
        },
      }
    },
    { quoted: m }
  );
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
