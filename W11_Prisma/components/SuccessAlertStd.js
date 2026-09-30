"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SuccessAlertStd() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success === "create") {
      Swal.fire({
        title: "เพิ่มข้อมูลสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
      });
      router.replace("/admin/tbl_std");
    } else if (success === "update") {
      Swal.fire({
        title: "แก้ไขข้อมูลสำเร็จ",
        text: "อัปเดตข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });
      router.replace("/admin/tbl_std");
    }
  }, [success, router]);

  return null;
}