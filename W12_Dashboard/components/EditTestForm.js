"use client";

import { useActionState } from "react";
import { updateTest } from "@/app/admin/tests/update/[id]/actions";

export default function EditTestForm({ test }) {
  const initialState = {
    errors: [],
    values: {
      id: test.id,
      name: test.name,
      lastname: test.lastname,
    },
  };

  const [state, formAction, pending] = useActionState(
    updateTest,
    initialState
  );

  return (
    <form action={formAction}>
      {/* ซ่อนฟิลด์ id สำหรับส่งกลับไปอัปเดต */}
      <input type="hidden" name="id" defaultValue={state?.values?.id} />

      {/* แจ้งเตือน Error Validation */}
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

      {/* name */}
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

      {/* lastname */}
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
        {pending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
      </button>
    </form>
  );
}