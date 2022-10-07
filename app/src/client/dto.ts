/*
cypherpost.io
Developed @ Stackmate India
*/

import * as fs from "fs";
import * as path from "path";
import { logger, r_500 } from "../lib/logger/winston";
import { filterError, parseRequest, respond } from "../lib/http/handler";

const base_path = `/home/node/stackmate.org/app/src/client/public`

export async function handleGetLandingPage(req, res) {
  const request = parseRequest(req);
  try {
    const exists = fs.existsSync(`${base_path}/index.html`);
    if (!exists) throw { code: 404, message: { html_exists_at_path: exists } };

    res.sendFile(path.join(base_path, "/index.html"));
  } catch (e) {
    let result = filterError(e, r_500, request);
    logger.debug({
      e
    });
    respond(result.code, result.message, res, request);
  }
}
export async function handleGetPrimerPage(req, res) {
  const request = parseRequest(req);
  try {
    const exists = fs.existsSync(`${base_path}/primer.html`);
    if (!exists) throw { code: 404, message: { html_exists_at_path: exists } };

    res.sendFile(path.join(base_path, "/primer.html"));
  } catch (e) {
    let result = filterError(e, r_500, request);
    logger.debug({
      e
    });
    respond(result.code, result.message, res, request);
  }
}
export async function handleGetCypherpostPage(req, res) {
  const request = parseRequest(req);
  try {
    const exists = fs.existsSync(`${base_path}/cypherpost.html`);
    if (!exists) throw { code: 404, message: { html_exists_at_path: exists } };

    res.sendFile(path.join(base_path, "/cypherpost.html"));
  } catch (e) {
    let result = filterError(e, r_500, request);
    logger.debug({
      e
    });
    respond(result.code, result.message, res, request);
  }
}