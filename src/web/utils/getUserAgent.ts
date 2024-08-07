"use client";
import UAParser from 'ua-parser-js';


export function getUserAgent() {
  const defaultUA = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";
  var parser = new UAParser();
  const ua = parser.getUA();
  return ua ?? defaultUA;
}