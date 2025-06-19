// editado y reestructurado por 
// https://github.com/deylin-eliac 

import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const formatAudio = ["mp3", "m4a", "webm", "acc", "flac", "opus", "ogg", "wav"];
const formatVideo = ["360", "480", "720", "1080", "1440", "4k"];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error("⚠️ Pika Pika~ Ese formato no es compatible.");
    }

    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data?.success) {
        const { id, title, info } = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return { id, title, image: info.image, downloadUrl };
      } else {
        throw new Error("⛔ Pikachu no pudo encontrar los detalles del video.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  },

  cekProgress: async (id) => {
    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    };

    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data?.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error("❌ Error:", error);
      throw error;
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('⚡️');

  if (!text.trim()) {
    return conn.reply(m.chat, "*Ｏ(≧∇≦)Ｏ🧃* *Pikachu-Bot* | Dime el nombre de la canción que estás buscando, ¡Pika!", m, rcanal);
  }

  try {
    const search = await yts(text);
    if (!search.all.length) {
      return m.reply("*(>_<)🧃* Pikachu no encontró nada con ese nombre...");
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);
    const thumb = (await conn.getFile(thumbnail))?.data;

    const infoMessage = `⚡🐭 
              \`Pikachu-Bot - Descargas Pokémon\`
*🎵 Título:* ${title}
> 🎬 *Duración:* ${timestamp}
> 👀 *Vistas:* ${vistas}
> 🎤 *Canal:* ${(videoInfo.author?.name) || "Desconocido"}
> 📅 *Publicado:* ${ago}
> 🔗 *Enlace:* ${url}`;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: "¡Pika Pikachu-bot! El bot eléctrico que necesitas.",
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true
        }
      }
    };

    await m.react('🎧');
    await conn.reply(m.chat, infoMessage, m, JT);

    // Audio (play/yta/ytmp3)
    if (["play", "yta", "ytmp3"].includes(command)) {
      const api = await ddownr.download(url, "mp3");

      const doc = {
  audio: { url: api.downloadUrl },
  mimetype: 'audio/mpeg',
  fileName: `${title}.mp3`,
  contextInfo: {
    externalAdReply: { 
     showAdAttribution: true, 
     title: packname, 
     body: dev, 
     mediaUrl: null, 
     description: null, 
     //previewType: "PHOTO", 
     thumbnailUrl: icono, 
     sourceUrl: redes, 
     mediaType: 1, 
     renderLargerThumbnail: false,
    }
  }
};




      return await conn.sendMessage(m.chat, doc, { quoted: m });
    }

    // Video (play2/ytv/ytmp4)
    if (["play2", "ytv", "ytmp4"].includes(command)) {
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];

      let success = false;
      for (let source of sources) {
  try {
    const res = await fetch(source);
    const { data, result, downloads } = await res.json();
    let downloadUrl = data?.dl || result?.download?.url || downloads?.url || data?.download?.url;

    if (downloadUrl) {
      success = true;
      await conn.sendMessage(m.chat, {
        video: { url: downloadUrl },
        fileName: `${title}.mp4`,
        mimetype: "video/mp4",
        caption: "🎬 Aquí tienes tu video, descargado por *Pikachu-Bot MD* ⚡",
        thumbnail: thumb,
        contextInfo: {
          externalAdReply: { 
            showAdAttribution: true, 
            title: packname, 
            body: dev, 
            mediaUrl: null, 
            description: null, 
            previewType: "PHOTO", 
            thumbnailUrl: icono, 
            sourceUrl: redes, 
            mediaType: 1, 
            renderLargerThumbnail: false 
          }
        }
      }, { quoted: m });
      break;
    }
  } catch (e) {
    console.error(`⚠️ Error con la fuente ${source}:`, e.message);
  }
}

      if (!success) {
        return m.reply("❌ Pikachu no pudo encontrar un enlace válido para descargar.");
      }
    }

  } catch (error) {
    console.error("❌ Error:", error);
    return m.reply(`⚠️ Ocurrió un error eléctrico: ${error.message}`);
  }
};

handler.command = handler.help = ["play", "play2", "ytmp3", "yta", "ytmp4", "ytv"];
handler.tags = ["downloader"];

export default handler;

function formatViews(views) {
  if (typeof views !== "number") return "Desconocido";
  return views >= 1000
    ? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
    : views.toString();
}