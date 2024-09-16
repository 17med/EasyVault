import jwt from "jsonwebtoken";
class TokenManager {
  static Tokens: String[] = [];
  static verify(s: string) {
    return TokenManager.Tokens.indexOf(s) != -1;
  }
  static async addToken(username: string) {
    const x = jwt.sign(
      { username: username, connectiondate: new Date() },
      "secret",
      {
        expiresIn: 60 * 60,
      }
    );
    if (TokenManager.verify(x)) {
      return x;
    }
    TokenManager.Tokens.push(x);
    console.log("token added");
    console.log("tokens number : ", TokenManager.Tokens.length);
    return x;
  }
  static removeToken(token: string) {
    const index = TokenManager.Tokens.indexOf(token);
    if (index != -1) {
      TokenManager.Tokens.splice(index, 1);
      console.log("token removed");
      console.log("tokens number : ", TokenManager.Tokens.length);
      return 200;
    }
    return 404;
  }
}
export default TokenManager;
