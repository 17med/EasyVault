import * as grpc from "@grpc/grpc-js";
import ConnectManger from "./protocolsManager/ConnectManager";
import UserManager from "./protocolsManager/UsersManager";
const server = new grpc.Server();

export default function startserver() {
  UserManager(server);
  ConnectManger(server);

  server.bindAsync(
    "0.0.0.0:51111",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(`Error binding server: ${error.message}`);
        return;
      }
      console.log(
        " _____              __     __          _ _     ____  ____  "
      );
      console.log(
        "| ____|__ _ ___ _   \\ \\   / /_ _ _   _| | |_  |  _ \\| __ ) "
      );
      console.log(
        "|  _| / _` / __| | | \\ \\ / / _` | | | | | __| | | | |  _ \\ "
      );
      console.log(
        `| |__| (_| \\__ \\ |_| |\\ V / (_| | |_| | | |_  | |_| | |_) |`
      );
      console.log(
        "|_____\\__,_|___/\\__, | \\_/ \\__,_|\\__,_|_|\\__| |____/|____/ "
      );
      console.log(
        "                |___/                                      "
      );

      console.log(`\nServer running at 127.0.0.1:51111`);
    }
  );
}
