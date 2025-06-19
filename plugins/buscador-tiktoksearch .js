import axios from 'axios';
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  generateWAMessageContent,
  getDevice
} = (await import("@whiskeysockets/baileys")).default;

// Define tus variables aquí
const avatar = 'https://telegra.ph/file/3b40bfe760e1c3e5f0c13.jpg';
const dev = '🧋ASUNABOT-Al';
const redes = 'https://instagram.com/tuperfil';

let handler = async (message, { conn, text, usedPrefix, command}) => {
  if (!text) {
    return conn.reply(message.chat, "❀ Por favor, ingrese un texto para realizar una búsqueda en TikTok.", message);
}

  async function createVideoMessage(url) {
    const { videoMessage} = await generateWAMessageContent({
      video: { url}
}, {
      upload: conn.waUploadToServer
});
    return videoMessage;
}

  function shuffleArray(array) {
    for (let i = array.length - 1; i> 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
}
}

  try {
    conn.reply(message.chat, '✧ *ENVIANDO SUS RESULTADOS..*', message, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: '♡ ͜ ۬︵࣪᷼⏜݊᷼ TikTok Finder ⏜࣪᷼︵۬ ͜ ',
          body: dev,
          previewType: 0,
          thumbnail: avatar,
          sourceUrl: redes
}
}
});

    const { data} = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${text}`);
    const searchResults = data.data;
    shuffleArray(searchResults);
    const topResults = searchResults.slice(0, 7);

    const cards = [];
    for (const result of topResults) {
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null}),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: dev}),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: result.title,
          hasMediaAttachment: true,
          videoMessage: await createVideoMessage(result.nowm)
}),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: []})
});
}

    const messageContent = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
},
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: "✧ RESULTADOS PARA: " + text
}),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: dev
}),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
}),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards
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
    conn.reply(message.chat, `⚠︎ *OCURRIÓ UN ERROR:* ${error.message}`, message);
}
};

handler.help = ["tiktoksearch <texto>"];
handler.tags = ["buscador"];
handler.command = ["tiktoksearch", "ttss", "tiktoks"];
handler.register = true;
handler.group = true;

export default handler;
```
