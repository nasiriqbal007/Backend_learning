import fs from "fs/promises";
export const createFile = async (fileName: string, content: string) => {
  try {
    await fs.writeFile(fileName, content);
  } catch (error) {
    console.log(error);
  }
};
export const readFile = async (fileName: string) => {
  try {
    const content = await fs.readFile(fileName, "utf-8");
    return content;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (fileName: string) => {
  try {
    await fs.unlink(fileName);
    return fileName;
  } catch (error) {
    console.log(error);
  }
};
export const updateFile = async (fileName: string, content: string) => {
  try {
    const readContent = await fs.readFile(fileName);
    const updateContent = readContent + content;
    await fs.writeFile(fileName, updateContent);
    return updateContent;
  } catch (error) {
    console.log(error);
  }
};
