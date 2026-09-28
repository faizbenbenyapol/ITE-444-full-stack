"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function updatePassword(prevState, formData) {

    const id = formData.get("id");

    const newPassword =
        formData.get("newPassword") || "";

    const confirmPassword =
        formData.get("confirmPassword") || "";

    const errors = [];


    // ตรวจ New Password
    if (
        !newPassword ||
        newPassword.length < 6 ||
        !/[A-Za-z]/.test(newPassword) ||
        !/[0-9]/.test(newPassword)
    ) {

        errors.push(
            "รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร และมีทั้งตัวอักษรและตัวเลข"
        );

    }


    // ตรวจ Confirm Password
    if (!confirmPassword) {

        errors.push(
            "กรุณายืนยันรหัสผ่านใหม่"
        );

    } else if (
        newPassword !== confirmPassword
    ) {

        errors.push(
            "รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน"
        );

    }


    // ถ้ามี Error ให้หยุดตรงนี้
    if (errors.length > 0) {

        return {
            errors
        };

    }


    // Hash Password
    const hashedPassword =
        await bcrypt.hash(
            newPassword,
            10
        );


    // Update Password
    await prisma.tbl_user.update({
        where: {
            id: Number(id)
        },

        data: {
            password: hashedPassword
        }
    });


    redirect(
        "/admin/users?success=updatePassword"
    );
}