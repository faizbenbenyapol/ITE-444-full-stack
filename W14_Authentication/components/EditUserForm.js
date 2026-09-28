"use client";

import { useActionState } from "react";
import { updateUser } from "@/app/admin/users/update/[id]/actions";

export default function EditUserForm({ users }) {

    const initialState = {

        errors: [],

        values: {
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role
        }

    };


    const [
        state,
        formAction,
        pending
    ] = useActionState(
        updateUser,
        initialState
    );


    return (

        <form action={formAction}>

           {/* ส่ง id ไป Server Action */}
            <input
                type="hidden"
                name="id"
                value={users.id}
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
                />
            </div>


        {/* role */}
            <div className="mb-3">
                <label className="form-label">
                    Role
                </label>
                <select
                    className="form-select"
                    name="role"
                    defaultValue={
                        state?.values?.role || "admin"
                    }
                >
                    <option value="admin">
                        admin
                    </option>
                </select>
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

