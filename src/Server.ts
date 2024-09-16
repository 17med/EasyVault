import grpc from "@grpc/grpc-js";
import ConnectManger from "./protocolsManager/ConnectManager";
const server = new grpc.Server();

export default function startserver() {
  ConnectManger(server);
  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(`Error binding server: ${error.message}`);
        return;
      }
      console.log(`Server running at http://127.0.0.1:50051`);
    }
  );
}
