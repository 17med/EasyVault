import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import { join } from 'path'

const PROTO_PATH = join(__dirname, '../../src/DRIVERDB/protocols/Collaction.proto')
console.log(join(__dirname, '../../src/DRIVERDB/protocols/Collaction.proto'))

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
const { CollactionService } = grpc.loadPackageDefinition(packageDefinition)

let clientInstance = null

export async function getCollactions(url, token, database) {
  try {
    if (!clientInstance) {
      clientInstance = new CollactionService(url, grpc.credentials.createInsecure())
    }

    // Call Getdb method on client instance
    const result = await new Promise((resolve, reject) => {
      clientInstance.Getcollaction({ token, db: database }, (error, response) => {
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
export async function AddCollaction(url, token, database, collaction) {
  try {
    if (!clientInstance) {
      clientInstance = new CollactionService(url, grpc.credentials.createInsecure())
    }

    // Call Getdb method on client instance
    const result = await new Promise((resolve, reject) => {
      clientInstance.Createcollaction(
        { token, name: collaction, db: database },
        (error, response) => {
          console.log(response)
          if (error) {
            console.log(error)
            return reject(500)
          }

          resolve(response.code)
        }
      )
    })

    return result
  } catch (error) {
    console.error('Error:', error)
    return 500
  }
}
