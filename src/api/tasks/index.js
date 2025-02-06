import { getTasks, createTask } from "@/lib/actions";

export const handler = async (req, res) => {
    if (req.method === "GET") {
        try{
            const tasks = await getTasks();
            res.status(200).json(tasks);
        }
        catch(error){
            res.status(500).json({ message: "An error occurred while retrieving tasks" });
        }
    }
    else if (req.method === "POST"){
        try{
            const newTask = await createTask(req.body);
            res.status(201).json({message: "Task created successfully"});
        }
        catch(error){
            res.status(500).json({ message: "An error occurred while creating task" });
        }
    }
}