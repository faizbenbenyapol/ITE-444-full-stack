"use client";
import { useActionState } from "react";
import { createUser } from "@/app/admin/users/create/actions";

const initialState = {
    errors: [],
    values: {
        name: "",
        email:"",
        password:"",
        role:""
    }
};

export default function CreateUserForm() {

    const [
        state,
        formAction,
        pending
    ] = useActionState(
        createUser,
        initialState
    );


    return (

        <form action={formAction}>


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


            {/* password */}
            <div className="mb-3">
                <label className="form-label">
                    password
                </label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="password"
                    defaultValue={
                        state?.values?.password || ""
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

            {/* Submit */}
            <button
                type="submit"
                className="btn btn-primary"
                disabled={pending}
            >
                {
                    pending
                        ? "กำลังบันทึก..."
                        : "บันทึก"
                }
            </button>
        </form>
    );
}

