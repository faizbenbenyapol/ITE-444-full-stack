"use client";

import { useActionState } from "react";
import { createStudent } from "@/app/admin/students/create/actions";

const initialState = {
  errors: [],
  values: { student_code: "", student_name: "", student_major: "" },
};

export default function CreateStudentForm() {
  const [state, formAction, pending] = useActionState(
    createStudent,
    initialState
  );

  return (
    <form action={formAction} noValidate>
      {state?.errors?.length > 0 && (
        <div className="alert alert-danger" role="alert">
          <strong>กรุณาตรวจสอบข้อมูล</strong>
          <ul className="mb-0 mt-2">
            {state.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">รหัสนักศึกษา</label>
        <input
          type="text"
          className="form-control"
          name="student_code"
          placeholder="เช่น 66012345"
          defaultValue={state?.values?.student_code || ""}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ชื่อ-นามสกุล</label>
        <input
          type="text"
          className="form-control"
          name="student_name"
          placeholder="เช่น สมชาย ใจดี"
          defaultValue={state?.values?.student_name || ""}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">สาขาวิชา</label>
        <input
          type="text"
          className="form-control"
          name="student_major"
          placeholder="เช่น เทคโนโลยีสารสนเทศ (IT)"
          defaultValue={state?.values?.student_major || ""}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
      </button>
    </form>
  );
}   