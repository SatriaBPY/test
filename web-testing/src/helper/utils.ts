import * as fs from "fs";
import * as path from "path";
import { promises as fsx } from "fs";
import { RootObject, ProductIdData } from "./types";

const defaultPath = path.join(process.cwd(), "./src/data/data_product.json");

export function loadJsonFile(filePath: string = defaultPath): RootObject {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("JSON file not found");
    }

    const rawData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(rawData) as RootObject;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function loadProductId(): ProductIdData {
  const defaultPaths = path.join(process.cwd(), "./src/data/productid.json");

  try {
    if (!fs.existsSync(defaultPaths)) {
      throw new Error("JSON file (PRODUCT ID) not found");
    }

    const rawData = fs.readFileSync(defaultPaths, "utf-8");
    return JSON.parse(rawData) as ProductIdData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteFolder(filePAth: string) {
  try {
    if (!fs.existsSync(filePAth)) {
      console.log("Folder not found");
      return;
    }

    await fsx.rm(filePAth, { recursive: true });
  } catch (err) {
    console.error(err, "Skipping deletion");
  }
}

export async function saveJsonFile(data: any, pathFile: string) {
  try {
    const dir = path.join(process.cwd(), pathFile);
    fsx.writeFile(dir, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
    throw err;
  }
}
