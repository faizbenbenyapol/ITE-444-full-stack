"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";


export async function createUser(prevState, formData) {

    const name = formData.get("name")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
    const password = formData.get("password")?.trim() || "";
    const role = formData.get("role")?.trim() || "";
    const errors = [];

            // name
            if (!name || name.length < 3) {
                errors.push(
                    "name ต้องมีอย่างน้อย 3 ตัวอักษร"
                );
            }

                // email
                if (!email) {

                    errors.push(
                        "กรุณากรอก email"
                    );

                } else if (
                    !email.includes("@") ||
                    !email.includes(".")
                ) {

                    errors.push(
                        "รูปแบบ email ไม่ถูกต้อง ต้องมี @ และ ."
                    );

                } else {

                    const existingUser = await prisma.tbl_user.findUnique({
                        where: {
                            email: email
                        }
                    });

                    if (existingUser) {
                        errors.push(
                            "email นี้ถูกใช้งานแล้ว"
                        );
                    }

                }

            // password
            if (
                !password ||
                password.length < 6 ||
                !/[A-Za-z]/.test(password) ||
                !/[0-9]/.test(password)
            ) {
                errors.push(
                    "password ต้องมีอย่างน้อย 6 ตัวอักษร และมีทั้งตัวอักษรและตัวเลข"
                );
            }
        
            // role
                if (!role || role.length < 3) {
                    errors.push(
                        "role ต้องมีอย่างน้อย 3 ตัวอักษร"
                    );
                }



    // ถ้ามี Error ส่งกลับไปหน้า Form
    if (errors.length > 0) {

        return {
            errors,

            values: {
                name,
                email,
                password,
                role 
            }
        };
    }

    // ผ่าน Validation ทุกข้อแล้วค่อยบันทึก
     const hashedPassword = await bcrypt.hash(
                password,
                10
    );

       await prisma.tbl_user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });
    redirect(
        "/admin/users?success=create"
    );
}

