"use client";

import { useActionState } from "react";
import { updateStd } from "@/app/admin/tbl_std/update/[id]/actions";

export default function EditStdForm({ std }) {
  const initialState = {
    errors: [],
    values: {
      id: std.id,
      std_code: std.std_code,
      std_name: std.std_name,
    },
  };

  const [state, formAction, pending] = useActionState(
    updateStd,
    initialState
  );

  return (
    <form action={formAction}>
      {state?.errors?.length > 0 && (
        <div className="alert alert-danger">
          <p className="mb-1 fw-bold">กรุณาตรวจสอบข้อมูล</p>
          <ul className="mb-0">
            {state.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ซ่อน id ไว้ส่งไปอัปเดต */}
      <input type="hidden" name="id" defaultValue={state?.values?.id || ""} />

     {/* รหัสนักศึกษา */}
      <div className="mb-3">
        <label className="form-label">รหัสนักศึกษา</label>
        <input
          type="text"
          className="form-control"
          name="std_code"
          placeholder="กรอกรหัสนักศึกษา"
          defaultValue={state?.values?.std_code || ""}
        />
      </div>

      {/* ชื่อนักศึกษา */}
      <div className="mb-3">
        <label className="form-label">ชื่อนักศึกษา</label>
        <input
          type="text"
          className="form-control"
          name="std_name"
          placeholder="กรอกชื่อ-นามสกุลนักศึกษา"
          defaultValue={state?.values?.std_name || ""}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
      </button>
    </form>
  );
}