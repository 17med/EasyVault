class useStore {
  static islogining = false
  static loginmethod = () => {}
  constructor(loginmethod) {
    this.loginmethod = loginmethod
  }
  static setlogin(v) {
    console.log(v)
    useStore.islogining = v
    useStore.loginmethod(v)
  }
  getStore() {
    return this.store
  }
}
export default useStore
