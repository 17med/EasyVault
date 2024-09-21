import fs from "fs/promises";
import { BSON, EJSON, ObjectId } from "bson";
import { RmDirOptions } from "fs";
export default class DataBaseMangments {
  static async getDbs() {
    const isFile = async (fileName: string) => {
      if ((await fs.lstat(fileName)).isFile() == true) {
        return true;
      } else {
        return false;
      }
    };
    const x = await fs.readdir("./src/DB/DataBases/");

    const s: any = [];
    for (var i = 0; i < x.length; i++) {
      try {
        if (!(await isFile(`./src/DB/DataBases/${x[i]}`))) {
          if (
            (
              await fs.lstat(`./src/DB/DataBases/${x[i]}/Manfestdb.vault`)
            ).isFile()
          ) {
            s.push(x[i]);
          }
        }
      } catch (e: any) {
        console.log(e);
      }
    }
    //console.log(s);
    return s;
  }

  static async CreateDb(name: string) {
    if ((await DataBaseMangments.getDbs()).indexOf(name) != -1) {
      return false;
    }
    await fs.mkdir(`./src/DB/DataBases/${name}`);
    const bytes = BSON.serialize({ _id: new ObjectId() });
    await fs.writeFile(`./src/DB/DataBases/${name}/Manfestdb.vault`, bytes);
    return true;
  }
  static async DeleteDb(name: string) {
    try {
      const rmdir: RmDirOptions = { recursive: true };
      await fs.rm(`./src/DB/DataBases/${name}`, rmdir);
      return true;
    } catch (e: any) {
      return false;
    }
  }
}
