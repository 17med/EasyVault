// custom-loader.mjs
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export async function load(url, context, defaultLoad) {
  if (url.endsWith(".js")) {
    const result = await defaultLoad(url, context, defaultLoad);
    result.format = "module";
    return result;
  }
  return defaultLoad(url, context, defaultLoad);
}
