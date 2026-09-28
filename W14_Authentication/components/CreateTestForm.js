"use client";

import { useActionState } from "react";
import { createTest } from "@/app/admin/tests/create/actions";

const initialState = {
  errors: [],
  values: {
    name: "",
    lastname: "",
  },
};

export default function CreateTestForm() {
  const [state, formAction, pending] = useActionState(
    createTest,
    initialState
  );

  return (
    <form action={formAction}>
      {/* แสดงข้อความแจ้งเตือน Error เมื่อ Validation ไม่ผ่าน */}
      {state?.errors && state.errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          <p className="fw-bold mb-2">กรุณาตรวจสอบข้อมูล</p>
          <ul className="mb-0">
            {state.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* input name */}
      <div className="mb-3">
        <label className="form-label">name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="name"
          defaultValue={state?.values?.name || ""}
        />
      </div>

      {/* input lastname */}
      <div className="mb-3">
        <label className="form-label">lastname</label>
        <input
          type="text"
          className="form-control"
          name="lastname"
          placeholder="lastname"
          defaultValue={state?.values?.lastname || ""}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "กำลังบันทึก..." : "บันทึก"}
      </button>
    </form>
  );
}