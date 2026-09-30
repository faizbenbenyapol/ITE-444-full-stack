"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateStd(prevState, formData) {
  const id = formData.get("id")?.trim() || "";
  const std_code = formData.get("std_code")?.trim() || "";
  const std_name = formData.get("std_name")?.trim() || "";
  const errors = [];

  // ตรวจสอบ รหัสนักศึกษา
  if (!std_code || std_code.length < 3) {
    errors.push("รหัสนักศึกษา ต้องมีอย่างน้อย 3 ตัวอักษร");
  }

  // ตรวจสอบ ชื่อนักศึกษา
  if (!std_name || std_name.length < 3) {
    errors.push("ชื่อนักศึกษา ต้องมีอย่างน้อย 3 ตัวอักษร");
  }

  // ถ้ามี Error ให้ส่งค่าเดิมกลับไปแสดงที่ฟอร์ม (รวม id ด้วย)
  if (errors.length > 0) {
    return {
      errors,
      values: {
        id,
        std_code,
        std_name,
      },
    };
  }

  // บันทึกการแก้ไขลง Prisma
  await prisma.tbl_std.update({
    where: {
      id: Number(id),
    },
    data: {
      std_code,
      std_name,
    },
  });

  redirect("/admin/tbl_std?success=update");
}