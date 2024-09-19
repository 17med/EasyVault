import fs from "fs/promises";
import { BSON, EJSON, ObjectId } from "bson";
import DataBaseMangments from "./DataBaseMangments";
import { RmDirOptions } from "fs";
export default class CollactionMangments {
  static async verify(database: string, collaction: string) {
    if ((await DataBaseMangments.getDbs()).indexOf(database) == -1) {
      return false;
    }
    if (
      (await CollactionMangments.getsCollactions(database)).indexOf(
        collaction
      ) == -1
    ) {
      return false;
    }
    return true;
  }
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
  static async DeleteCollaction(database: string, name: string) {
    if ((await DataBaseMangments.getDbs()).indexOf(database) == -1) {
      return false;
    }
    try {
      const rmdir: RmDirOptions = { recursive: true };
      await fs.rm(`./src/DB/DataBases/${database}/${name}`, rmdir);
      return true;
    } catch (e: any) {
      return false;
    }
  }
}
CollactionMangments.CreateCollaction("TEST", "TESTCOL");
