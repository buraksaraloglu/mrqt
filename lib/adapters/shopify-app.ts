import crypto from "crypto";

import { env } from "@/env.mjs";

const algorithm = "aes-256-cbc";
const password = env.OKBRK_API_SALT;

export function encryptAuthOkbrkRequest(input: {
  shop: string;
  accessToken: string;
}) {
  const key = crypto.scryptSync(password, "salt", 32);
  const iv = Buffer.alloc(16, 0);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(JSON.stringify(input), "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

export function decryptAuthOkbrkRequest(encrypted: string) {
  const key = crypto.scryptSync(password, "salt", 32);
  const iv = Buffer.alloc(16, 0);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
