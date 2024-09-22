import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { join } from 'path'

const PROTO_PATH = join(__dirname, '../../src/DRIVERDB/protocols/Connect.proto')
console.log(join(__dirname, '../protocols/Connect.proto'))
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
const { ConnectService } = grpc.loadPackageDefinition(packageDefinition)
let connectClient
// Function to connect to the ConnectService
export function connectToService(url, username, password) {
  return new Promise((resolve, reject) => {
    // Initialize gRPC client for ConnectService
    connectClient = new ConnectService(url, grpc.credentials.createInsecure())

    // Connect to the service
    connectClient.connect({ username, password }, (error, response) => {
      if (error) {
        console.log('error')
        reject(`Error connecting: ${error.message}`)
      } else {
        console.log('response', response)
        resolve(response)
      }
    })
  })
}
export function DisconnectService(token) {
  return new Promise((resolve, reject) => {
    connectClient.disconnect({ token }, (error, response) => {
      if (error) {
        console.log('error')
        reject(`Error connecting: ${error.message}`)
      } else {
        console.log('response', response)
        resolve(response)
      }
    })
  })
}
