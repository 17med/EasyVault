import fs from "fs/promises";
import { BSON, EJSON, ObjectId } from "bson";
import DataBaseMangments from "./DataBaseMangments";
export default class CollactionMangments {
  static async getsCollactions(database: string) {
    const isFile = async (fileName: string) => {
      if ((await fs.lstat(fileName)).isFile() == true) {
        return true;
      } else {
        return false;
      }
    };
    const x = await fs.readdir("./src/DB/DataBases/" + database);

    const s: any = [];
    for (var i = 0; i < x.length; i++) {
      try {
        if (!(await isFile(`./src/DB/DataBases/${database}/${x[i]}`))) {
          s.push(x[i]);
        }
      } catch (e: any) {}
    }

    return s;
  }

  static async CreateCollaction(database: string, name: string) {
    if ((await DataBaseMangments.getDbs()).indexOf(database) == -1) {
      return false;
    }
    try {
      await fs.mkdir(`./src/DB/DataBases/${database}/${name}`);
      return true;
    } catch (e: any) {
      return false;
    }
  }
}
