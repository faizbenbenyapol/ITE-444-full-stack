"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

export default function SuccessAlert() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const success = searchParams.get("success");
    if (!success) return;

    // เช็กว่าอยู่หน้า student หรือ product
    const isStudent = pathname.includes("/students");
    const label = isStudent ? "ข้อมูลนักศึกษา" : "ข้อมูลสินค้า";
    const redirectUrl = isStudent ? "/admin/students" : "/admin/products";

    if (success === "create") {
      Swal.fire({
        title: "เพิ่มข้อมูลสำเร็จ",
        text: `บันทึก${label}เรียบร้อยแล้ว`,
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      router.replace(redirectUrl);
    } else if (success === "update") {
      Swal.fire({
        title: "ปรับปรุงข้อมูลสำเร็จ",
        text: `อัปเดต${label}เรียบร้อยแล้ว`,
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      router.replace(redirectUrl);
    }
  }, [searchParams, router, pathname]);

  return null;
}