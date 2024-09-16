import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import TokenManager from "./TokenManager";
import { disconnect } from "process";
const PROTO_PATH = "./src/protocols/Connect.proto";
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const Connect = grpc.loadPackageDefinition(packageDefinition) as unknown as {
  ConnectService: grpc.ServiceClientConstructor;
};
export default function Init(server: any) {
  server.addService(Connect.ConnectService.service, {
    connect: async (
      { request: { username, password } }: any,
      callback: any
    ) => {
      console.log(
        `Received request with username: ${username} password: ${password}`
      );
      const token = await TokenManager.addToken(username);
      callback(null, {
        message: `Hello ${username}`,
        code: 200,
        token: token,
      });
    },
    
    disconnect: ({ request: { token } }: any, callback: any) => {
      console.log(`Received request token ss ${token}`);
      const x = TokenManager.removeToken(token);
      console.log(x);
      callback(null, {
        code: x,
      });
    },
  });
}
