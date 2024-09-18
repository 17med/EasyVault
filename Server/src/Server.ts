import grpc from "@grpc/grpc-js";
import ConnectManger from "./protocolsManager/ConnectManager";
import UserManager from "./protocolsManager/UsersManager";
const server = new grpc.Server();

export default function startserver() {
  UserManager(server);
  ConnectManger(server);

  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(`Error binding server: ${error.message}`);
        return;
      }
      console.log(`Server running at http://127.0.0.1:51111`);
    }
  );
}
