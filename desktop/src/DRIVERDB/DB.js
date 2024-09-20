import { connectToService, DisconnectService } from './client'
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
        console.log(x)
        DB.Token = x.token
        DB.url = url
        DB.username = username
        DB.password = password
        DB.url = url
        return 200
      }
    } catch (e) {
      return 401
    }
  }
  async Disconnect() {
    try {
      console.log(DB.Token)
      const x = await DisconnectService(DB.Token)
      console.log('slslslslld', x)
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
}
