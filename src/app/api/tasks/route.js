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

export async function PUT(req) {
  try {
    await connectDB();
    const { id, ...updatedTask } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }

    const task = await TaskModel.findByIdAndUpdate(
      id,
      { ...updatedTask, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated successfully", task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating task", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { taskId } = await req.json();
    console.log(taskId);

    if (!taskId) {
      return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }

    const task = await TaskModel.findByIdAndDelete(taskId);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully", taskId: id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting task", error: error.message }, { status: 500 });
  }
}