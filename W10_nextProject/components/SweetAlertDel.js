"use client";

import Swal from "sweetalert2";

export default function DeleteButton() {
  const handleDelete = async (e) => {
    e.preventDefault();

    const form = e.currentTarget.form;

    const result = await Swal.fire({
      title: "ยืนยันการลบข้อมูล?",
      text: "เมื่อลบแล้วจะไม่สามารถกู้คืนข้อมูลนี้ได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "ลบเลย",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      form.requestSubmit();
    }
  };

  return (
    <button
      type="submit"
      className="btn btn-danger btn-sm px-3"
      onClick={handleDelete}
    >
      ลบ
    </button>
  );
}