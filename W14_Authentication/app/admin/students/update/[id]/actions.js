"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateStudent(prevState, formData) {
  const id = formData.get("id");
  const student_code = formData.get("student_code")?.trim() || "";
  const student_name = formData.get("student_name")?.trim() || "";
  const student_major = formData.get("student_major")?.trim() || "";

  const errors = [];

  // รหัสนักศึกษา (varchar 15, unique)
  if (!student_code || student_code.length < 5) {
    errors.push("รหัสนักศึกษาต้องมีอย่างน้อย 5 ตัวอักษร");
  } else if (student_code.length > 15) {
    errors.push("รหัสนักศึกษาต้องไม่เกิน 15 ตัวอักษร");
  } else {
    // ตรวจรหัสซ้ำที่ไม่ใช่ของตัวเอง
    const existing = await prisma.student.findFirst({
      where: {
        student_code,
        NOT: { id: Number(id) },
      },
    });
    if (existing) {
      errors.push("รหัสนักศึกษานี้มีอยู่ในระบบแล้ว");
    }
  }

  // ชื่อ-นามสกุล (varchar 150)
  if (!student_name || student_name.length < 3) {
    errors.push("ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร");
  } else if (student_name.length > 150) {
    errors.push("ชื่อ-นามสกุลต้องไม่เกิน 150 ตัวอักษร");
  }

  // สาขาวิชา (varchar 200)
  if (!student_major) {
    errors.push("กรุณากรอกสาขาวิชา");
  } else if (student_major.length > 200) {
    errors.push("สาขาวิชาต้องไม่เกิน 200 ตัวอักษร");
  }

  if (errors.length > 0) {
    return {
      errors,
      values: { id, student_code, student_name, student_major },
    };
  }

  await prisma.student.update({
    where: { id: Number(id) },
    data: { student_code, student_name, student_major },
  });

  redirect("/admin/students?success=update");
}
