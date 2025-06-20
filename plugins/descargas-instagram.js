/*import { igdl } from "ruhend-scraper"

let handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '*🥞 Por favor, ingresa un link de Instagram.*')
  }
  try {
    await m.react('⏳️')
    let res = await igdl(args[0])
    let data = res.data
    for (let media of data) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', '\`\`\`◜Instagram - Download◞\`\`\`\n\n> © Powered by Shadow Ultra\n> Video downloaded successfully')
    }
  } catch {
    await m.react('❌')
    conn.reply(m.chat, '*❌ Ocurrió un error.*')
  }
}

handler.command = ['instagram', 'ig', 'instagram2', 'ig2']
handler.tags = ['downloader']
handler.help = ['instagram', 'ig']

export default handler*/


import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
    if (!args[0]) {

        return conn.reply(m.chat, `*${xdownload} Por favor, ingresa un link de Instagram.*`, m);
    }

    const igUrlRegex = /^https?:\/\/www\.instagram\.com\/([a-zA-Z0-9_-]+)\/.*$/;
    if (!igUrlRegex.test(args[0])) {
        await m.react('✖️');
        return conn.reply(m.chat, `*⚠️ El link de Instagram no es correcto*`, m);
    }

    try {
        await m.react('⏳');
        const response = await axios.get(
            `https://restapi-v2.simplebot.my.id/download/instagram?url=${encodeURIComponent(args[0])}`
        );

        const data = response.data;
        if (!data.status || !data.result || !data.result.downloadUrls) throw new Error('Respuesta inválida de la API');

        const { title, downloadUrls } = data.result;
        const sentUrls = new Set();

        for (let url of downloadUrls) {
            if (sentUrls.has(url)) continue;
            sentUrls.add(url);

            const isImage = /\.(jpe?g|png|webp|heic|tiff|bmp)(\?|$)/i.test(url);
            const caption = `\`\`\`◜Instagram - Download◞\`\`\`\n\n*🌴 \`Título:\`* ${title}*`;
            if (isImage) {
                await conn.sendMessage(
                    m.chat,
                    { image: { url }, caption },
                    { quoted: m }
                );
            } else {
                await conn.sendMessage(
                    m.chat,
                    { video: { url }, caption },
                    { quoted: m }
                );
            }
        }

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        return conn.reply(m.chat, `*❌ Error al descargar contenido de Instagram.*`, m);
    }
};

handler.help = ['ig <link>'];
handler.tags = ['dl'];
handler.command = /^(ig|igdl|instagram)$/i;

export default handler;
