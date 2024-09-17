import fs from "fs/promises";
import bcrypt from "bcrypt";
export default class UserMangments {
  static async getusers() {
    const x = await fs.readFile("./src/DB/users.json", "utf-8");
    const users = JSON.parse(x);
    console.log(users);
  }

  static async login(username: string, password: string) {
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
