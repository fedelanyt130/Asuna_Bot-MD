import speed from 'performance-now'
import { exec } from 'child_process'
import ws from 'ws'

let handler = async (m, { conn }) => {
  let timestamp = speed();
  let latensi = speed() - timestamp;
  const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];

  exec(`neofetch --stdout`, (error, stdout, stderr) => {
    let sysinfo = stdout.toString("utf-8").replace(/Memory:/, "Ram:");

    const pikachuPing = `
╭━━━⊰ ⚡ *Pikachu-Bot* ⚡ ⊱━━━╮
┃ ⚡ *Estado:* ¡Activo y cargado! ⚡
┃ 🕒 *Velocidad:* ${latensi.toFixed(4)} ms
┃ 🧃 *Subbots:* ${users.length}
╰━━━━━━━━━━━━━━━━━━━━━━━╯
`.trim();

    conn.reply(m.chat, pikachuPing, fkontak, rcanal);
  });
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler