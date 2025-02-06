import { NextResponse } from "next/server";
import TaskModel from "@/models/Task";
import connectDB from "@/lib/mongodb";

export async function GET(req) {
  try {
    await connectDB();
    const tasks = await TaskModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching tasks", error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    if (!body.title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }
    if (!body.dueDate) {
      return NextResponse.json({ message: "DueDate is required" }, { status: 400 });
    }
    if (!body.description) {
      return NextResponse.json({ message: "description is required" }, { status: 400 });
    }

    const existingTask = await TaskModel.findOne({ title: body.title });

        if (existingTask) {
            return NextResponse.json(
                { message: "Task already exists" }, 
                { status: 400 }
            );
        }

    const newTask = new TaskModel({
      title: body.title,
      description: body.description,
      completed: false,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
    });

    const savedTask = await newTask.save();
    return NextResponse.json({ message: "Task created successfully", task: savedTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating task", error: error.message }, { status: 500 });
  }
}

