import { getPayload as getPayloadInstance } from "payload";
import type { Payload } from "payload";
import config from "@payload-config";

let cachedPayload: Payload | null = null;

export async function getPayload() {
  if (!cachedPayload) {
    cachedPayload = await getPayloadInstance({ config });
  }
  return cachedPayload;
}
