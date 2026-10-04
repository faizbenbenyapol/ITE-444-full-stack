"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

// อ่าน ?success=create|update|delete แล้วเด้ง SweetAlert จากนั้นลบ query ออกจาก URL
const MESSAGES = {
  create: { title: "เพิ่มข้อมูลสำเร็จ", text: "บันทึกข้อมูลเรียบร้อยแล้ว" },
  update: { title: "แก้ไขข้อมูลสำเร็จ", text: "อัปเดตข้อมูลเรียบร้อยแล้ว" },
  delete: { title: "ลบข้อมูลสำเร็จ", text: "ลบข้อมูลเรียบร้อยแล้ว" },
};

export default function SuccessAlert() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const msg = MESSAGES[searchParams.get("success")];
    if (!msg) return;

    Swal.fire({ ...msg, icon: "success", confirmButtonText: "ตกลง" });
    router.replace(pathname);
  }, [searchParams, router, pathname]);

  return null;
}
