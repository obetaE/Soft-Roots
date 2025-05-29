import { NextResponse } from "next/server";
import {connectMongoDB} from "@/libs/config/db"
import UserModel from "@/libs/models/UserModel"
import bcrypt from "bcryptjs"

export async function POST(req){
    try {
        const {name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB();
        await UserModel.create({name, email, password: hashedPassword})

        console.log("Name:" , name);
        console.log("Email:" , email);
        console.log("Password:" , password);

        return NextResponse.json({message: "User Registered"}, {status: 201})
    } catch (error) {
     return NextResponse.json({ message: "An Error occured while registering the user" }, { status: 500 });   
    }
}