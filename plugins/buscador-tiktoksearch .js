import axios from 'axios';
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  generateWAMessageContent,
} = (await import("@whiskeysockets/baileys")).default;

// --- ¡IMPORTANTE! DEFINE ESTAS VARIABLES ---
// Reemplaza estos valores con los tuyos. Son necesarios para que el bot funcione correctamente.
const rcanal = 'https://whatsapp.com/channel/xxxxxxxxxxxxxx'; // URL de tu canal de WhatsApp
const dev = 'Deymoon Club oficial'; // Tu nombre o el nombre de tu bot
const avatar = 'https://telegra.ph/file/xxxxxxxx.jpg'; // URL de una imagen para usar como miniatura
const redes = 'https://github.com/tu_usuario'; // URL a tus redes o a un repositorio

let handler = async (message, { conn, text, usedPrefix, command }) => {
  if (!text) {
    // Se usa 'rcanal' que definimos arriba.
    return conn.reply(message.chat, `💎 Por favor, ingresa un texto para realizar una búsqueda en TikTok.\n\n*Ejemplo:* ${usedPrefix + command} gatitos`, message, { contextInfo: { mentionedJid: [message.sender] } });
  }

  try {
    // Mensaje inicial de "Cargando..."
    conn.reply(message.chat, '🩵 *Buscando los videos, espera un momento...*', message, {
      contextInfo: { 
        externalAdReply: { 
          mediaUrl: null, 
          mediaType: 1, 
          showAdAttribution: true,
          title: 'Deymoon Club',
          body: dev, // Se usa 'dev' que definimos arriba
          previewType: 0, 
          thumbnail: await (await conn.getFile(avatar)).data, // Descargamos la miniatura para evitar problemas
          sourceUrl: redes // Se usa 'redes' que definimos arriba
        }
      }
    });

    // 1. Hacemos la petición a la API
    const { data } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(text)}`);

    // 2. Validamos la respuesta de la API
    if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return conn.reply(message.chat, '⚠︎ No se encontraron resultados para tu búsqueda. Intenta con otro término.', message);
    }

    let searchResults = data.data;

    // 3. Mezclamos y seleccionamos los resultados
    // Función para mezclar el array
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    shuffleArray(searchResults);
    const topResults = searchResults.slice(0, 7); // Tomamos hasta 7 resultados

    // Helper para crear el mensaje de video
    const createVideoMessage = async (url) => {
      const { videoMessage } = await generateWAMessageContent({
        video: { url }
      }, {
        upload: conn.waUploadToServer
      });
      return videoMessage;
    };

    // 4. Procesamos los videos en paralelo para mayor velocidad
    const cardPromises = topResults.map(result => 
      createVideoMessage(result.nowm).then(videoMessage => ({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: dev }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: result.title,
          hasMediaAttachment: true,
          videoMessage: videoMessage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      }))
    );
    
    const cards = await Promise.all(cardPromises);

    // 5. Construimos y enviamos el mensaje de carrusel
    const messageContent = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `💎 Resultados de: *${text}*`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: dev
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: cards
            })
          })
        }
      }
    }, {
      quoted: message
    });

    await conn.relayMessage(message.chat, messageContent.message, {
      messageId: messageContent.key.id
    });

  } catch (error) {
    console.error(error); // Log del error en la consola para depuración
    conn.reply(message.chat, `⚠︎ *OCURRIÓ UN ERROR INESPERADO:*\n${error.message}`, message);
  }
};

handler.help = ["tiktoksearch <texto>"];
handler.register = true;
handler.group = true;
handler.tags = ["buscador"];
handler.command = ["tiktoksearch", "ttss", "tiktoks"];

export default handler;
