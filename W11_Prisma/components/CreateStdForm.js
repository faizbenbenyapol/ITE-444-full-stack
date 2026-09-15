"use client";

import { useActionState } from "react";
import { createStd } from "@/app/admin/tbl_std/create/actions";

const initialState = {
  errors: [],
  values: {
    std_code: "",
    std_name: "",
  },
};

export default function CreateStdForm() {
  const [state, formAction, pending] = useActionState(
    createStd,
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

      {/* ช่องรหัสนักศึกษา*/}
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

{/* ช่องชื่อนักศึกษา*/}
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
        {pending ? "กำลังบันทึก..." : "บันทึก"}
      </button>
    </form>
  );
}