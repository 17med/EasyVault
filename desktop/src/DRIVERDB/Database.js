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
export async function Createdb(name, token, url) {
  try {
    console.log('url', url, token, name)
    if (!clientInstance) {
      clientInstance = new DbService(url, grpc.credentials.createInsecure())
    }

    // Call Getdb method on client instance
    const result = await new Promise((resolve, reject) => {
      clientInstance.Createdb({ token, name }, (error, response) => {
        if (error) {
          return reject(500)
        }
        console.log('resss', response)
        resolve(response.code)
      })
    })

    return result
  } catch (error) {
    console.error('Error:', error)
    return 500
  }
}
export async function Deletedb(name, token, url) {
  try {
    console.log('url', url, token, name)
    if (!clientInstance) {
      clientInstance = new DbService(url, grpc.credentials.createInsecure())
    }

    // Call Getdb method on client instance
    const result = await new Promise((resolve, reject) => {
      clientInstance.Deletedb({ token, name }, (error, response) => {
        if (error) {
          return reject(500)
        }
        console.log('resss', response)
        resolve(response.code)
      })
    })

    return result
  } catch (error) {
    console.error('Error:', error)
    return 500
  }
}


