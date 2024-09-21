import { connectToService, DisconnectService } from './client'
import { getDatabases, Createdb, Deletedb } from './Database'
import { getCollactions, AddCollaction } from './Collaction'
export default class DB {
  static Token = null
  static url = null
  static username = null
  static password = null
  static url = null
  async Connect(username, password, url) {
    try {
      const x = await connectToService(url, username, password)
      if (x.code == 401) {
        return 401
      } else {
        console.log('x :', x)
        DB.Token = x.token
        DB.url = url
        DB.username = username
        DB.password = password
        DB.url = url
        return 200
      }
    } catch (e) {
      return 500
    }
  }
  async Disconnect() {
    try {
      console.log(DB.Token)
      const x = await DisconnectService(DB.Token)

      if (x.code == 401) {
        return 401
      } else {
        this.Token = null

        DB.username = null
        DB.password = null
        DB.url = null
        return 200
      }
    } catch (e) {
      return 401
    }
  }
  async getDatabases() {
    try {
      const x = await getDatabases(DB.url, DB.Token)

      return x.dblist
    } catch (e) {
      return []
    }
  }
  async createDatabase(name) {
    try {
      const s = await Createdb(name, DB.Token, DB.url)

      return s
    } catch (e) {
      return 500
    }
  }
  async deleteDatabase(name) {
    try {
      const s = await Deletedb(name, DB.Token, DB.url)
      return s
    } catch (e) {
      return 500
    }
  }
  async getcollaction(dbname) {
    try {
      const s = await getCollactions(DB.url, DB.Token, dbname)
      return s.collectionlist
    } catch (e) {
      return []
    }
  }
  async createCOllaction(dbname, collaction) {
    try {
      const s = await AddCollaction(DB.url, DB.Token, dbname, collaction)
      return s
    } catch (e) {
      console.log(e)
      return 500
    }
  }
}
