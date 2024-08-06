import { join } from 'path';
import * as fs from 'fs';

export default async function initSwagger() {
    console.log('Combining swagger files...');

    const basePath = 'swagger/base.json';
    const base = JSON.parse(fs.readFileSync(basePath, 'utf8'));

    const pathsDir = 'swagger/paths';
    const files = fs.readdirSync(pathsDir).filter(file => file.endsWith('.json'));

    const combinedPaths: Record<string, any> = {};

    files.forEach(file => {
        const filePath = join(pathsDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        Object.assign(combinedPaths, data);
    });

    base.paths = combinedPaths;

    const outputPath = 'swagger/combined.json';
    fs.writeFileSync(outputPath, JSON.stringify(base, null, 2));
}
