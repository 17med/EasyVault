import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./src/protocols/Connect.proto";
const UserPAth = "./src/protocols/Users.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync([PROTO_PATH, UserPAth], options);
let token = "";
const ConnectService = grpc.loadPackageDefinition(packageDefinition)
  .ConnectService as grpc.ServiceClientConstructor;
const UserService = grpc.loadPackageDefinition(packageDefinition)
  .UserService as grpc.ServiceClientConstructor;
const client = new ConnectService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
const Users = new UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
client.connect(
  { username: "test", password: "test" },
  (error: any, response: any) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    token = response.token;
    Users.CreateUser(
      {
        token: token,
        username: "test1",
        password: "test1",
        isadmin: false,
      },
      (error: any, response: any) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        console.log(response);
      }
    );
  }
);

/*
client.disconnect({ token: token }, (error: any, response: any) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    console.log("disconnected", response);
  });
  */
