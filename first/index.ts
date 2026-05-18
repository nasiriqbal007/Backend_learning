import { add, subtract, moduleName } from "./math.js";
import { createFile, readFile, updateFile, deleteFile } from "./fileSystem.js";

async function main() {
  console.log("hello world");
  console.log(add(2, 3));
  console.log(subtract(5, 2));
  console.log(moduleName);

  await createFile(
    "newFile.txt",
    "this is the first file created by fs module in node js ",
  );

  await new Promise((resolve) => {
    console.log("Waiting ..");

    setTimeout(resolve, 1500);
  });

  const content = await readFile("newFile.txt");
  console.log("Content:", content);
  await new Promise((resolve) => {
    console.log("Waiting for read ..");

    setTimeout(resolve, 1500);
  });
  const update = await updateFile(
    "newFile.txt",
    "add some extra text is there",
  );
  console.log("updated: ", update);
  await new Promise((resolve) => {
    console.log("Waiting for update..");

    setTimeout(resolve, 1500);
  });
  const deleted = await deleteFile("newFile.txt");
  console.log("delete:", deleted);
}

main();
