import CollactionMangments from "./CollationMangments";
import fs from "fs/promises";
import { BSON, ObjectId } from "bson";
import pako from "pako";
import { compress, decompress } from "brotli";
export default class DocumentMangments {
  static async insertDocument(
    database: string,
    collaction: string,
    document: any
  ) {
    if (await CollactionMangments.verify(database, collaction)) {
      try {
        const doc = { _id: new ObjectId() };
        const docx = { ...doc, ...document };

        const bytes = BSON.serialize(docx);

        await fs.writeFile(
          `./src/DB/DataBases/${database}/${collaction}/${docx._id}.Vault`,
          bytes
        );
        return true;
      } catch (e: any) {
        return false;
      }
    }
  }
  static async getDocument(database: string, collaction: string, filtre: any) {
    if (await CollactionMangments.verify(database, collaction)) {
      try {
        const x = await fs.readdir(
          `./src/DB/DataBases/${database}/${collaction}`
        );
        const s: any = [];
        for (var i = 0; i < x.length; i++) {
          const bytes = await fs.readFile(
            `./src/DB/DataBases/${database}/${collaction}/${x[i]}`
          );

          const doc = BSON.deserialize(bytes);
          let is = true;
          for (const key in filtre) {
            if (filtre[key] != doc[key]) {
              is = false;
            }
          }
          if (is) {
            s.push(doc);
          }
        }
        console.log(s);
        return s;
      } catch (e: any) {
        console.log("error", e);
        return [];
      }
    }
  }
}
DocumentMangments.insertDocument("TEST", "TESTCOL", {
  name: "test",
  password: "test",
});
DocumentMangments.getDocument("TEST", "TESTCOL", {});
