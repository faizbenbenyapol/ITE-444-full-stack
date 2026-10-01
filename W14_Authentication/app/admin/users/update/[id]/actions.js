"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function updateUser(prevState, formData) {

    const id = formData.get("id")?.trim() || "";
    const name = formData.get("name")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
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

                    const existingUser = await prisma.tbl_user.findFirst({
                        where: {
                            email: email,
                            NOT: {
                                id: Number(id)
                            }
                        }
                    });

                    if (existingUser) {
                        errors.push(
                            "email นี้ถูกใช้งานแล้ว"
                        );
                    }
                }
        
            // role
                if (!["admin", "user"].includes(role)) {
                    errors.push(
                        "กรุณาเลือก role เป็น admin หรือ user"
                    );
                }

    // ถ้ามี Error ส่งกลับไปหน้า Form
    if (errors.length > 0) {

        return {

            errors,

            values: {
                id,
                name,
                email,
                role
            }

        };

    }


    // ถ้าผ่าน Validation ทุกข้อ
    // จึงค่อย Update ลงฐานข้อมูล
 
        await prisma.tbl_user.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                email,
                role
            }
        });

    redirect(
        "/admin/users?success=update"
    );

}

