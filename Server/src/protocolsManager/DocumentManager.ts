import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import TokenManager from "../Services/TokenManagments";
import DocumentMangments from "../Services/DocumentMangments";
const PROTO_PATH = "./src/protocols/Document.proto";
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const Documentserv = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as {
  DocumentsService: grpc.ServiceClientConstructor;
};
export default function Init(server: any) {
  server.addService(Documentserv.DocumentsService.service, {
    CreateDocument: async (
      { request: { database, token, collection, document } }: any,
      callback: any
    ) => {
      if (await TokenManager.verify(token)) {
        const x = await DocumentMangments.insertDocument(
          database,
          collection,
          document
        );
        if (x) {
          callback(null, {
            message: "Document created successfully",
            code: 201,
          });
        } else {
          callback(null, {
            message: "Document exist",
            code: 400,
          });
        }
      } else {
        callback(null, {
          message: `unauthorized`,
          code: 401,
        });
      }
    },
    DeleteDocument: async (
      { request: { database, token, collection, fitlter } }: any,
      callback: any
    ) => {
      if (await TokenManager.verify(token)) {
        const x = await DocumentMangments.deleteDocument(
          database,
          collection,
          fitlter
        );
        if (x) {
          callback(null, {
            message: "Document deleted successfully",
            code: 200,
          });
        } else {
          callback(null, {
            message: "ERROR",
            code: 500,
          });
        }
      } else {
        callback(null, {
          message: "unauthorized",
          code: 401,
        });
      }
    },
    Getdocuments: async (
      { request: { database, token, collection, fitlter } }: any,
      callback: any
    ) => {
      if (await TokenManager.verify(token)) {
        const x = await DocumentMangments.getDocument(
          database,
          collection,
          fitlter
        );
        if (x) {
          callback(null, {
            message: "Documents",
            code: 200,
            documents: x,
          });
        } else {
          callback(null, {
            message: "ERROR",
            code: 500,
          });
        }
      } else {
        callback(null, {
          message: "unauthorized",
          code: 401,
        });
      }
    },
    Updatedocuments: async (
      { request: { database, token, collection, fitlter, update } }: any,
      callback: any
    ) => {
      if (await TokenManager.verify(token)) {
        const x = await DocumentMangments.updateDocument(
          database,
          collection,
          fitlter,
          update
        );
        if (x) {
          callback(null, {
            message: "Document updated successfully",
            code: 200,
          });
        } else {
          callback(null, {
            message: "No files updated",
            code: 200,
          });
        }
      } else {
        callback(null, {
          message: "unauthorized",
          code: 401,
        });
      }
    },
  });
}
