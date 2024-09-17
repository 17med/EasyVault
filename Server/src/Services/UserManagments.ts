import fs from "fs/promises";
import bcrypt from "bcrypt";
import path from "path";
export default class UserMangments {
  static async fileexist() {
    try {
      await fs.access(path.join("./src/DB/users.json"));
    } catch {
      console.log("File does not exist");
      await fs.writeFile(
        "./src/DB/users.json",
        JSON.stringify({
          users: [
            {
              username: "admin",
              password:
                "$2b$10$Fx8IiK/EkhsbbhBvUwhctuMeFXURPJ0gTCDniuRguyQ3wsIc5SJL2",
              isadmin: true,
            },
          ],
        })
      );
    }
  }
  static async deleteUser(username: string) {
    await UserMangments.fileexist();
    const x = await fs.readFile("./src/DB/users.json", "utf-8");
    const users = JSON.parse(x);
    console.log("users : ", users.users);
    const l = users.users.filter((e: any) => e.username != username);
    users.users = l;
    await fs.writeFile("./src/DB/users.json", JSON.stringify({ users: l }));
    return true;
  }
  static async getusers() {
    await UserMangments.fileexist();
    const x = await fs.readFile("./src/DB/users.json", "utf-8");
    const users = JSON.parse(x);
    console.log(users);
  }

  static async login(username: string, password: string) {
    await UserMangments.fileexist();
    const x = await fs.readFile("./src/DB/users.json", "utf-8");
    const users = JSON.parse(x);
    const user = users.users.find((x: any) => x.username == username);
    if (user == undefined) {
      console.log("user not found");
      return false;
    }
    const isvalid = await bcrypt.compare(password, user.password);
    if (isvalid) {
      console.log("user is valid");
      return [true, user.isadmin];
    }
    console.log("password is incorrect");
    return false;
  }

  static async adduser(username: string, password: string, isadmin: boolean) {
    await UserMangments.fileexist();
    const x = await fs.readFile("./src/DB/users.json", "utf-8");
    const users = JSON.parse(x);
    if (users.users.indexOf({ username: username }) != -1) {
      console.log("user already exists");
      return false;
    }
    const passwordcrypted = await bcrypt.hash(password, 10);
    console.log(passwordcrypted);
    users.users.push({
      username: username,
      password: passwordcrypted,
      isadmin: isadmin,
    });

    await fs.writeFile("./src/DB/users.json", JSON.stringify(users));
    return true;
  }
}
