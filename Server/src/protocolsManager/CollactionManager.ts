import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import TokenManager from "../Services/TokenManagments";
import CollactionMangments from "../Services/CollationMangments";
const PROTO_PATH = "./src/protocols/CollactionService.proto";
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const CollactionServ = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as {
  CollactionService: grpc.ServiceClientConstructor;
};
export default function Init(server: any) {
  server.addService(CollactionServ.CollactionService.service, {
    Createcollaction: async (
      { request: { database, token, name } }: any,
      callback: any
    ) => {
      if (await TokenManager.verify(token)) {
        const x = await CollactionMangments.CreateCollaction(database, name);
        if (x) {
          callback(null, {
            message: "collaction created succ",
            code: 200,
          });
        } else {
          callback(null, {
            message: "error",
            code: 500,
          });
        }
      } else {
        callback(null, {
          message: `unauthorized`,
          code: 401,
        });
      }
    },
    Deletecollaction: async (
      { request: { database, token, name } }: any,
      callback: any
    ) => {
      if (!(await TokenManager.verify(token))) {
        callback(null, {
          message: "unauthorized",
          code: 401,
        });
      } else {
        const x = await CollactionMangments.DeleteCollaction(database, name);
        if (x) {
          callback(null, {
            message: "Collaction deleted successfully",
            code: 200,
          });
        } else {
          callback(null, {
            message: "Collaction deleted successfully",
            code: 500,
          });
        }
      }
    },
  });
}
