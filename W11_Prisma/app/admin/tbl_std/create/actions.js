  "use server";

  import prisma from "@/lib/prisma";
  import { redirect } from "next/navigation";

  export async function createStd(prevState, formData) {
    
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

    // ถ้ามี Error ส่งกลับไปหน้า Form
    if (errors.length > 0) {
      return {
        errors,
        values: {
          std_code,
          std_name,
        },
      };
    }

    // ผ่าน Validation บันทึกลงฐานข้อมูลด้วย Prisma
    await prisma.tbl_std.create({
      data: {
        std_code,
        std_name,
      },
    });

    redirect("/admin/tbl_std?success=create");
  }