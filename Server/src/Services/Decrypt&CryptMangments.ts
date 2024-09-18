import { generateKeyPairSync, publicEncrypt, privateDecrypt } from "crypto";

export default function generateKeyPair(passphrase: string): {
  publicKey: string;
  privateKey: string;
} {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: passphrase,
    },
  });

  return {
    publicKey,
    privateKey,
  };
}
const encrypt = async (text: string, publicKey: string) => {
  return await publicEncrypt(publicKey, Buffer.from(text, "utf8")).toString(
    "base64"
  );
};
const decrypt = async (encryptedText: string, privateKey: string) => {
  return await privateDecrypt(
    {
      key: privateKey,
    },
    Buffer.from(encryptedText, "base64")
  ).toString("utf8");
};
