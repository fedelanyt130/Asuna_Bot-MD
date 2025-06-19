/*creador por angel xd
(Brayan se la come)*/


import cp, {exec as _exec} from 'child_process';
import {promisify} from 'util';
import fs from 'fs';
const exec = promisify(_exec).bind(cp);
const handler = async (m, {conn, isROwner, usedPrefix, command, text}) => {
  const ar = Object.keys(plugins);
  const ar1 = ar.map((v) => v.replace('.js', ''));
  if (!text) throw `**Ｏ(≧∇≦)Ｏ🧃* *Pikachu-Bot* Ingresa el nombre de algún archivo existente Pika Pika ⚡\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾*\n*◉ ${usedPrefix + command}* info-infobot\n\n*—◉ 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙿𝙻𝚄𝙶𝙸𝙽𝚂 (𝙰𝚁𝙲𝙷𝙸𝚅𝙾𝚂) 𝙴𝚇𝙸𝚂𝚃𝙴𝙽𝚃𝙴𝚂:*\n*◉* ${ar1.map((v) => ' ' + v).join`\n*◉*`}`;
  if (!ar1.includes(text)) return m.reply(`*Ｏ(≧∇≦)Ｏ🧃* *Pikachu-Bot* *Estimado entrenador no se encontró un plugin (𝙰𝚁𝙲𝙷𝙸𝚅𝙾) 𝙻𝙻𝙰𝙼𝙰𝙳𝙾 "${text}", ingresa alguno existente Pika Pika ⚡*\n\n*==================================*\n\n*—◉ *Ｏ(≧∇≦)Ｏ🧃 *Pikachu-Bot* *aquí están los archivos existentes:*\n*◉* ${ar1.map((v) => ' ' + v).join`\n*◉*`}`);
  let o;
  try {
    o = await exec('cat plugins/' + text + '.js');
  } catch (e) {
    o = e;
  } finally {
    const {stdout, stderr} = o;
    if (stdout.trim()) {
      const aa = await conn.sendMessage(m.chat, {text: stdout}, {quoted: m});
      await conn.sendMessage(m.chat, {document: fs.readFileSync(`./plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js`}, {quoted: aa});
    }
    if (stderr.trim()) {
      const aa2 = await conn.sendMessage(m.chat, {text: stderr}, {quoted: m});
      await conn.sendMessage(m.chat, {document: fs.readFileSync(`./plugins/${text}.js`), mimetype: 'application/javascript', fileName: `${text}.js`}, {quoted: aa2});
    }
  }
};
handler.help = ['getplugin'].map((v) => v + ' *<nombre>*');
handler.tags = ['owner'];
handler.command = /^(getplugin|gp)$/i;
handler.rowner = true;
export default handler;