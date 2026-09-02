
"use client";

import Swal from "sweetalert2";

export default function DeleteButton() {
  const handleDelete = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");

    Swal.fire({
      title: "ยืนยันการลบสินค้า?",
      text: "หากลบแล้วจะไม่สามารถกู้คืนข้อมูลได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        form.requestSubmit();
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-danger btn-sm"
      onClick={handleDelete}
    >
      ลบ
    </button>
  );
}