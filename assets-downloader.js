// write a script to download all the assets from the folder and paste it to assets folder
const FOLDER = "";
const NUMBER_OF_IMAGES = 1;

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsFolder = 'assets';
const assetsFolderPath = path.join(__dirname, assetsFolder);

// Create assets folder if it doesn't exist
if (!fs.existsSync(assetsFolderPath)) {
    fs.mkdirSync(assetsFolderPath, { recursive: true });
}

// Create the subfolder for finished leather
const finishedLeatherPath = path.join(assetsFolderPath, FOLDER);
if (!fs.existsSync(finishedLeatherPath)) {
    fs.mkdirSync(finishedLeatherPath, { recursive: true });
}

const baseUrl = "https://zeeshanexim.com/images";

const downloadAsset = async (asset) => {
    const assetUrl = `${baseUrl}/${asset}`;
    const assetPath = path.join(assetsFolderPath, asset);
    const assetResponse = await fetch(assetUrl);
    const assetData = await assetResponse.blob();
    const buffer = Buffer.from(await assetData.arrayBuffer());
    fs.writeFileSync(assetPath, buffer);
    console.log(`Downloaded: ${asset}`);
}

const main = async () => {
    for(let i = 1; i <= NUMBER_OF_IMAGES; i++) {
        const asset = FOLDER ? `${FOLDER}/${i}.jpg` : `banner${i}.jpg`;
        await downloadAsset(asset);
    }
}

main().catch(console.error);