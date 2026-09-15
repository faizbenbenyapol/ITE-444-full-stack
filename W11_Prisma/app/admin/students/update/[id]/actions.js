"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function updateStudent(prevState, formData) {
  const id = formData.get("id");
  const student_code = formData.get("student_code")?.trim() || "";
  const student_name = formData.get("student_name")?.trim() || "";
  const student_major = formData.get("student_major")?.trim() || "";

  const errors = [];

  if (!student_code || student_code.length < 5) {
    errors.push("รหัสนักศึกษาต้องมีอย่างน้อย 5 ตัวอักษร");
  }
  if (!student_name || student_name.length < 3) {
    errors.push("ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร");
  }
  if (!student_major) {
    errors.push("กรุณากรอกสาขาวิชา");
  }

  // ตรวจรหัสซ้ำที่ไม่ใช่ของตัวเอง
  const [existing] = await db.query(
    "SELECT id FROM student WHERE student_code = ? AND id != ?",
    [student_code, id]
  );
  if (existing.length > 0) {
    errors.push("รหัสนักศึกษานี้มีอยู่ในระบบแล้ว");
  }

  if (errors.length > 0) {
    return {
      errors,
      values: { id, student_code, student_name, student_major },
    };
  }

  await db.query(
    "UPDATE student SET student_code = ?, student_name = ?, student_major = ? WHERE id = ?",
    [student_code, student_name, student_major, id]
  );

  redirect("/admin/students?success=update");
}