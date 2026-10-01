"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SuccessAlertUser() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const success = searchParams.get("success");

        if (success === "create") {
            Swal.fire({
                title: "เพิ่มข้อมูลสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง"
            });
            router.replace("/admin/users");
        }

        else if (success === "update") {
            Swal.fire({
                title: "แก้ไขข้อมูลสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง"
            });
            router.replace("/admin/users");
        }

        else if (success === "delete") {
            Swal.fire({
                title: "ลบข้อมูลสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง"
            });
            router.replace("/admin/users");
        }

           else if (success === "updatePassword") {
            Swal.fire({
                title: "Reset Password",
                text: "Success Fully",
                icon: "success",
                confirmButtonText: "ตกลง"
            });
            router.replace("/admin/users");
        }

    }, [searchParams, router]);

    return null;
}

