import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsFolder = 'assets';
const assetsFolderPath = path.join(__dirname, assetsFolder);
const productCatalogs = [

]

// Function to check image dimensions by reading the file header
function getImageDimensions(imageBuffer) {
    // Check for JPEG
    if (imageBuffer[0] === 0xFF && imageBuffer[1] === 0xD8) {
        // JPEG files
        let i = 2;
        while (i < imageBuffer.length - 1) {
            // Look for SOF0 marker (Start of Frame)
            if (imageBuffer[i] === 0xFF && imageBuffer[i + 1] === 0xC0) {
                if (i + 9 < imageBuffer.length) {
                    const height = (imageBuffer[i + 5] << 8) | imageBuffer[i + 6];
                    const width = (imageBuffer[i + 7] << 8) | imageBuffer[i + 8];
                    return { width, height };
                }
            }
            i++;
            // Skip to next marker
            while (i < imageBuffer.length && imageBuffer[i] !== 0xFF) {
                i++;
            }
        }
    }
    
    // For other formats, we'll return null and skip the file
    return null;
}

const getProductLabel = (folder) => {
    const productLabel = folder.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    return productLabel;
}

// go through all folders from assets folder and then go through each files and rename it 1,2,3,4 (with extension)....etc
const main = async () => {
    console.log('Starting asset renaming process...');
    
    if (!fs.existsSync(assetsFolderPath)) {
        console.error(`Assets folder not found: ${assetsFolderPath}`);
        return;
    }

    const folders = fs.readdirSync(assetsFolderPath);
    console.log(`Found ${folders.length} folders in assets:`, folders);

    for (const folder of folders) {
        const folderPath = path.join(assetsFolderPath, folder);
        productCatalogs.push({
            folder: folder,
            product_name: folder,
            product_label: getProductLabel(folder),
            products: []
        })
        
        // Check if it's a directory
        if (!fs.statSync(folderPath).isDirectory()) {
            console.log(`Skipping non-directory: ${folder}`);
            continue;
        }

        console.log(`Processing folder: ${folder}`);
        
        const files = fs.readdirSync(folderPath).filter(file => 
            file.toLowerCase().endsWith('.jpg') || 
            file.toLowerCase().endsWith('.jpeg') || 
            file.toLowerCase().endsWith('.png')
        );

        console.log(`Found ${files.length} image files in ${folder}`);

        // First pass: check aspect ratios and mark files for deletion
        const deletedCount = 0;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filePath = path.join(folderPath, file);
            
            try {
                // Check if file still exists (might have been renamed already)
                if (!fs.existsSync(filePath)) {
                    continue;
                }

                // Read image and check aspect ratio
                const imageBuffer = fs.readFileSync(filePath);
                
                // Skip if file is too small to be a valid image
                if (imageBuffer.length < 10) {
                    console.log(`Skipping small file: ${file}`);
                    continue;
                }

                const dimensions = getImageDimensions(imageBuffer);
                
                if (dimensions) {
                    const aspectRatio = dimensions.height / dimensions.width;
                    
                    // If aspect ratio is extremely small (like 0.01 or less), mark for deletion
                    // This catches very wide images that are likely banners or very thin images
                    if (aspectRatio < 0.5) {
                        const newFileName = `${deletedCount}_deleted_${new Date().getTime()}.jpg`;
                        const newFilePath = path.join(folderPath, newFileName);
                        
                        // Check if target file already exists
                        if (fs.existsSync(newFilePath)) {
                            // Delete the file instead of renaming
                            fs.unlinkSync(filePath);
                            console.log(`Deleted file (aspect ratio ${aspectRatio.toFixed(6)}): ${file}`);
                        } else {
                            fs.renameSync(filePath, newFilePath);
                            deletedCount++;
                            console.log(`Marked for deletion (aspect ratio ${aspectRatio.toFixed(6)}): ${file} -> ${newFileName}`);
                        }
                    }
                } else {
                    console.log(`Could not read dimensions for: ${file}`);
                }
            } catch (error) {
                console.error(`Error processing file ${file}:`, error.message);
            }
        }

        // Second pass: rename remaining files to 1.jpg, 2.jpg, etc.
        const remainingFiles = fs.readdirSync(folderPath)
            .filter(file => 
                (file.toLowerCase().endsWith('.jpg') || 
                 file.toLowerCase().endsWith('.jpeg') || 
                 file.toLowerCase().endsWith('.png')) &&
                !file.includes('_deleted')
            )
            .sort((a, b) => {
                // Sort by filename (natural sort)
                const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
                const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
                return aNum - bNum;
            });

        console.log(`Renaming ${remainingFiles.length} remaining files in ${folder}`);

        let count = 1;
        for (const file of remainingFiles) {
            const oldPath = path.join(folderPath, file);
            const newPath = path.join(folderPath, `${count}.jpg`);
            
            try {
                // Check if source file still exists
                if (!fs.existsSync(oldPath)) {
                    console.log(`File no longer exists: ${file}`);
                    continue;
                }

                // Check if target file already exists
                if (fs.existsSync(newPath) && oldPath !== newPath) {
                    console.log(`Skipping rename, target already exists: ${file} -> ${count}.jpg`);
                    count++;
                    continue;
                }

                fs.renameSync(oldPath, newPath);
                productCatalogs[productCatalogs.length - 1].products.push({
                    name: `${productCatalogs[productCatalogs.length - 1].product_label} Style ${count}`,
                    image: `/${assetsFolder}/${folder}/${file}`
                })
                console.log(`Renamed: ${file} -> ${count}.jpg`);
                count++;
            } catch (error) {
                console.error(`Error renaming ${file}:`, error.message);
            }
        }

        console.log(`Completed processing folder: ${folder}`);
    }

    console.log('Asset renaming process completed!');
    fs.writeFileSync('product_catalog.json', JSON.stringify(productCatalogs, null, 2));
}

main().catch(console.error);