import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { join } from 'path'

const PROTO_PATH = join(__dirname, '../../src/DRIVERDB/protocols/Database.proto')
console.log(join(__dirname, '../../src/DRIVERDB/protocols/Database.proto'))

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
const { DbService } = grpc.loadPackageDefinition(packageDefinition)
// Replace 'YourPackageName' with the actual package name

let clientInstance = null // Maintain a client instance

// Function to get databases
export async function getDatabases(url, token) {
  try {
    console.log('url', url)
    if (!clientInstance) {
      clientInstance = new DbService(url, grpc.credentials.createInsecure())
    }

    // Call Getdb method on client instance
    const result = await new Promise((resolve, reject) => {
      clientInstance.Getdb({ token }, (error, response) => {
        if (error) {
          return reject(error)
        }
        resolve(response)
      })
    })

    console.log(result)
    return result
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}
