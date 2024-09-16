import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import TokenManager from "./TokenManager";
import UserMangments from "../Services/UserMangments";
const PROTO_PATH = "./src/protocols/Users.proto";
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const Users = grpc.loadPackageDefinition(packageDefinition) as unknown as {
  UserService: grpc.ServiceClientConstructor;
};

export default function Init(server: any) {
  server.addService(Users.UserService.service, {
    CreateUser: async (
      { request: { token, username, password, isadmin } }: any,
      callback: any
    ) => {
      if (TokenManager.verify(token) == true) {
        const x = await UserMangments.adduser(username, password, isadmin);
        if (x) {
          callback(null, {
            message: `user created successfully`,
            code: 200,
          });
          return;
        } else {
          callback(null, {
            message: `user exist`,
            code: 400,
          });
        }
      }
      callback(null, {
        message: `unauthorized`,
        code: 401,
      });
    },
  });
}
