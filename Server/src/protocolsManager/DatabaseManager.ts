import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import TokenManager from "../Services/TokenManagments";
import UserMangments from "../Services/UserManagments";
const PROTO_PATH = "./src/protocols/DbService.proto";
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const DbServ = grpc.loadPackageDefinition(packageDefinition) as unknown as {
  DbService: grpc.ServiceClientConstructor;
};
export default function Init(server: any) {
  server.addService(DbServ.DbService.service, {
    Createdb: async ({ request: { token, name } }: any, callback: any) => {
      if (await TokenManager.isAdmin(token)) {
        
      } else {
        callback(null, {
          message: `unauthorized`,
          code: 401,
        });
      }
    },
  });
  
}
