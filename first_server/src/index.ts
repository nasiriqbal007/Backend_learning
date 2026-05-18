import express, { type Request, type Response } from "express";

interface Task {
  id: number;
  task: string;
  tag: string[];
  status: string;
}
const data: Task[] = [
  {
    id: 1,
    task: "Create api ",
    tag: ["Ts", "api"],
    status: "todo",
  },
  {
    id: 2,
    task: " make api ",
    tag: ["Ts", "api"],
    status: "todo",
  },
  {
    id: 3,
    task: "read api ",
    tag: ["Ts", "api"],
    status: "todo",
  },
];
const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response): void => {
  res.send("this is project");
});
app.get("/tasks", (req: Request, res: Response): void => {
  res.json(data);
});
app.post("/tasks/create", (req: Request, res: Response): void => {
  try {
    const newData = {
      id: 4,
      task: "read api ",
      tag: ["Ts", "api"],
      status: "todo",
    };
    data.push(newData);
    res.json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});
app.get("/tasks", ( req,res) => {
  const find = data.find((item) => item.id === 900);
  if (find) {
    res.json(find);
  } else {
    res.status(404).json({ message: "task not found" });
  }
});

app.delete("/tasks/:id", (req: Request, res: Response): void => {
  const findItem = data.findIndex((item) => item.id === Number(req.params.id));
  if (findItem === -1) {
    res.status(404).json({ message: "task not found" });
    return;
  }
  const deleted = data.filter((item) => item.id !== findItem);

  res.json(deleted);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("sever running on port:", PORT);
});

// const server = http.createServer(
//   (req: IncomingMessage, res: ServerResponse) => {
//     try {
//       if (req.url === "/") {
//         res.statusCode = 200;

//         res.end("home page new nw");
//       } else if (req.url === "/about") {
//         res.statusCode = 200;
//         res.end("about page");
//       } else {
//         res.statusCode = 400;
//         res.end("page not found");
//       }
//     } catch (res) {
//       console.log(res);
//     }
//   },
// );
// server.listen(3000, () => {
//   console.log("sever running on port 4000");
// });
