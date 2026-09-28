"use client";

import { useActionState } from "react";
import { updatePassword } from "@/app/admin/users/reset/[id]/actions";

export default function ResetPasswordForm({ ResetPasswords }) {

    const initialState = {

        errors: [],

         values: {
                id: ResetPasswords.id,
                name: ResetPasswords.name,
                email: ResetPasswords.email
        }

    };


    const [
        state,
        formAction,
        pending
    ] = useActionState(
        updatePassword,
        initialState
    );


    return (

        <form action={formAction}>

           {/* ส่ง id ไป Server Action */}
            <input
                type="hidden"
                name="id"
                value={ResetPasswords.id}
            />
            

            {/* Validation Error */}
            {state?.errors?.length > 0 && (

                <div
                    className="alert alert-danger"
                    role="alert"
                >

                    <strong>
                        กรุณาตรวจสอบข้อมูล
                    </strong>

                    <ul className="mb-0 mt-2">

                        {state.errors.map(
                            (error, index) => (

                                <li key={index}>
                                    {error}
                                </li>

                            )
                        )}

                    </ul>

                </div>

            )}


 

        {/* name */}

              {/* name */}
            <div className="mb-3">
                <label className="form-label">
                    name
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="name"
                    defaultValue={
                        state?.values?.name || ""
                    }
                    disabled
                />
            </div>

          {/* email */}
            <div className="mb-3">
                <label className="form-label">
                    email
                </label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="email"
                    defaultValue={
                        state?.values?.email || ""
                    }
                    disabled
                />
            </div>


             {/* new password */}
            <div className="mb-3">
                <label className="form-label">
                    new password
                </label>
                <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    placeholder="new password"
                />
            </div>


              {/* new password */}
            <div className="mb-3">
                <label className="form-label">
                   confirm Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    placeholder="confirm Password"
                />
            </div>


            {/* ปุ่มบันทึก */}
            <button
                type="submit"
                className="btn btn-primary"
                disabled={pending}
            >

                {
                    pending
                        ? "กำลังบันทึก..."
                        : "บันทึกการแก้ไข"
                }

            </button>

        </form>

    );
}

