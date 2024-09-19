import fs from "fs";
import path from "path";

function addJsExtension(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      addJsExtension(filePath);
    } else if (file.endsWith(".js")) {
      let content = fs.readFileSync(filePath, "utf8");
      content = content.replace(/(from\s+['"]\.\/[^'"]+)(['"])/g, "$1.js$2");
      fs.writeFileSync(filePath, content);
    }
  });
}

addJsExtension("./dist");

addJsExtension("./dist/protocolsManager/");
