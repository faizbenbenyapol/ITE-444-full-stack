"use server";
 
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/auth";
 
export async function login(prevState, formData) {
 
    const email = formData.get("email")?.trim();
    const password = formData.get("password");
 
    const errors = [];
 
    if (!email) {
        errors.push("กรุณากรอก Email");
    }
 
    if (!password) {
        errors.push("กรุณากรอก Password");
    }
 
    if (errors.length > 0) {
        return {
            errors,
            values: {
                email: email || "",
            },
        };
    }
 
    try {
 
        const user = await prisma.tbl_user.findUnique({
            where: {
                email: email,
            },
        });
 
        if (!user) {
            return {
                errors: ["Email หรือ Password ไม่ถูกต้อง"],
                values: {
                    email,
                },
            };
        }
 
        if (user.role != 'admin') {
            return {
                errors: ["บัญชีนี้ถูกปิดการใช้งาน"],
                values: {
                    email,
                },
            };
        }
 
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );
 
        if (!passwordMatch) {
            return {
                errors: ["Email หรือ Password ไม่ถูกต้อง"],
                values: {
                    email,
                },
            };
        }
 
        // สร้าง Session
        await createSession({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
 
    } catch (error) {
 
        console.error(error);
 
        return {
            errors: ["เกิดข้อผิดพลาดในการเข้าสู่ระบบ"],
            values: {
                email,
            },
        };
    }
 
    // Login สำเร็จ
    redirect("/admin");
}