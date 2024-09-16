import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./src/protocols/Connect.proto";
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const newsProto = grpc.loadPackageDefinition(packageDefinition) as unknown as {
  ConnectService: grpc.ServiceClientConstructor;
};
const server = new grpc.Server();

server.addService(newsProto.ConnectService.service, {
  connect: ({ request: { username, password } }: any, callback: any) => {
    console.log(
      `Received request with username: ${username} password: ${password}`
    );

    callback(null, { message: `Hello ${username}`, code: 200 });
  },
});
export default function startserver() {
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
