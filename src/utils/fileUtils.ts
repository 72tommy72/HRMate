// import fs from 'fs/promises';
// import path from 'path';

// export async function readJsonFile<T = any>(filePath: string): Promise<T> {
//     const data = await fs.readFile(filePath, 'utf-8');
//     return JSON.parse(data);
// }

// export async function writeJsonFile(filePath: string, data: any): Promise<void> {
//     const json = JSON.stringify(data, null, 2);
//     await fs.writeFile(filePath, json, 'utf-8');
// }

// export async function updateJsonFile(filePath: string, updater: (data: any) => any): Promise<void> {
//     const data = await readJsonFile(filePath);
//     const updatedData = updater(data);
//     await writeJsonFile(filePath, updatedData);
// }

// export async function deleteFromJsonFile(filePath: string, filterFn: (item: any) => boolean): Promise<void> {
//     const data = await readJsonFile(filePath);
//     const newData = data.filter((item: any) => !filterFn(item));
//     await writeJsonFile(filePath, newData);
// }

// export async function appendToJsonFile(filePath: string, newItem: any): Promise<void> {
//     const data = await readJsonFile(filePath);
//     data.push(newItem);
//     await writeJsonFile(filePath, data);
// }
