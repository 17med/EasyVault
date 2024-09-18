import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import TokenManager from "../Services/TokenManagments";
import UserMangments from "../Services/UserManagments";
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
      if ((await TokenManager.isAdmin(token)) == true) {
        const x = await UserMangments.adduser(username, password, isadmin);
        if (x) {
          callback(null, {
            message: `User created successfully`,
            code: 201,
          });
          return;
        } else {
          callback(null, {
            message: `User exist`,
            code: 400,
          });
        }
      }
      callback(null, {
        message: `unauthorized`,
        code: 401,
      });
    },
    DeleteUser: async (
      { request: { token, username } }: any,
      callback: any
    ) => {
      if ((await TokenManager.isAdmin(token)) == true) {
        await UserMangments.deleteUser(username);
        callback(null, {
          message: "User deleted successfully",
          code: 200,
        });
      } else {
        callback(null, {
          message: `unauthorized`,
          code: 401,
        });
      }
    },
  });
}
