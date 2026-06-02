import crypto from "crypto";
import { err, ok } from "neverthrow";

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;
const IV_LENGTH = 12;

let secretKey: Buffer;

export function getSecretKey() {
  if (!secretKey) {
    const keyEnv = process.env.NEXTAUTH_SECRET;
    if (!keyEnv) {
      return err("APP_SECRET_KEY");
    }
    if (keyEnv.length < KEY_LENGTH) {
      console.warn(
        `APP_SECRET_KEY is shorter than ${KEY_LENGTH} bytes. Padding with zeros. Consider using a stronger key.`,
      );
      secretKey = Buffer.concat([
        Buffer.from(keyEnv),
        Buffer.alloc(KEY_LENGTH - keyEnv.length, 0),
      ]);
    } else {
      secretKey = Buffer.from(keyEnv.substring(0, KEY_LENGTH));
    }
  }
  return ok(secretKey);
}

export function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  return getSecretKey().match(
    (secretKey) => {
      const cipher = crypto.createCipheriv(ALGORITHM, secretKey, iv);
      const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final(),
      ]);
      const authTag = cipher.getAuthTag();
      return ok({
        iv: iv.toString("hex"),
        encryptedData: `${encrypted.toString("hex")}:${authTag.toString("hex")}`,
      });
    },
    (e) => err(e),
  );
}

export function decrypt(ivHex: string, encryptedDataWithTagHex: string) {
  const [encryptedHex, authTagHex] = encryptedDataWithTagHex.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  return getSecretKey().match(
    (secretKey) => {
      const decipher = crypto.createDecipheriv(ALGORITHM, secretKey, iv);
      decipher.setAuthTag(authTag);

      const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ]);
      return ok(decrypted.toString("utf8"));
    },
    (e) => err(e),
  );
}
