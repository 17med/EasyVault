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

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
var token = "";
const ConnectService =
  grpc.loadPackageDefinition(packageDefinition).ConnectService;

//ts-ignore
const client = new ConnectService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
client.connect(
  { username: "ahmed", password: "ahmed" },
  (error: any, response: any) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    token = response.token;
    console.log(response);
    client.disconnect({ token: token }, (error: any, response: any) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      console.log("disconnected", response);
    });
  }
);
