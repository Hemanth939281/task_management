import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import TaskModel from "@/models/Task";

export async function PUT(req, {params}) {
    try {
      await connectDB();
      
      const { id } = params;
     
      const updatedTask  = await req.json();
  
      if (!id) {
        return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
      }
  
      const task = await TaskModel.findByIdAndUpdate(
        id,
        updatedTask,
        { new: true}
      );
  
      if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Task updated successfully", task }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error updating task", error: error.message }, { status: 500 });
    }
  }
  
  export async function DELETE(req,{params}) {
    try {
      await connectDB();
    
      const { id } = params;
    
      if (!id) {
        return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
      }
  
      const task = await TaskModel.findByIdAndDelete(id);
      if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Task deleted successfully", taskId: id }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error deleting task", error: error.message }, { status: 500 });
    }
  }