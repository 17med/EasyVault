import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import TokenManager from "../Services/TokenManagments";
import CollactionMangments from "../Services/CollationMangments";
import path from "path";
const PROTO_PATH = "./src/protocols/Collaction.proto";
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
      { request: { db, token, name } }: any,
      callback: any
    ) => {
      if (await TokenManager.verify(token)) {
        const x = await CollactionMangments.CreateCollaction(db, name);
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
    Getcollaction: async ({ request: { db, token } }: any, callback: any) => {
      if (!(await TokenManager.verify(token))) {
        callback(null, {
          message: "unauthorized",
          code: 401,
        });
      } else {
        const x = await CollactionMangments.getsCollactions(db);
        console.log(x);
        callback(null, {
          collectionlist: x,
          message: "",
          code: 200,
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
