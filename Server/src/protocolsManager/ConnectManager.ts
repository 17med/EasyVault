import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import TokenManager from "../Services/TokenManagments";
import UserMangments from "../Services/UserManagments";
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
      const res = await UserMangments.login(username, password);
      if (res == false) {
        callback(null, {
          message: `please verify ur data`,
          code: 401,
        });
        return;
      }
      console.log(
        `Received request with username: ${username} password: ${password}`
      );
      const token = await TokenManager.addToken(username, res[1]);
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
