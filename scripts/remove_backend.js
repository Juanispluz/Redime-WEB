const fs = require("fs");
let c = fs.readFileSync("Agents (1).md", "utf8");

// Eliminate backend architecture parts
c = c.replace(/+-- backend\/[\s\S]*?¦\s+/m, "");
c = c.replace(/### 2\.2 Backend[^]*?---\s*## 3/m, "--- \n\n## 3");
c = c.replace(/## 3\. Seguridad[^]*?## 5\. Resp/m, "## 5. Resp");
c = c.replace(/### 5\.2 Backend[^]*?---\s*## 6/m, "---\n\n## 6");
c = c.replace(/### 6\.2 Backend[^]*?---\s*## 7/m, "### 6.2 Prohibiciones\n- Dos features del frontend no se importan entre sí.\n\n---\n\n## 7");
c = c.replace(/\| Controllers.*?\n\| Routes.*?\n\| Middleware.*?\n\| Models.*?\n\| Repositories.*?\n/m, "");
c = c.replace(/Paralelamente debe crear la estructura en `backend[^]*?API\.md`\./m, "");
c = c.replace(/### Backend[^]*?---\s*## 10/m, "---\n\n## 10");
c = c.replace(/\[Service.*\n    ¦ HTTP \+ GPG[\s\S]*?\]\n    ¦\n    ? \(respuesta sube por el mismo camino, cifrada de vuelta\)/gm, "[API Externa / Simulación]");

// Clean table in 8.2
c = c.replace(/\| No exponer clave GPG privada en frontend.*?\n/g,"");
c = c.replace(/\| No saltar middleware de seguridad.*?\n/g,"");
c = c.replace(/\| No mezclar frontend y backend en el mismo archivo.*?\n/g,"");

fs.writeFileSync("Agents (1).md", c);
