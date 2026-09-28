///login form
 
"use client";
import Navbar from "@/components/Navbar";
import BootstrapClient from "@/components/BootstrapClient";
import { useActionState } from "react";
import { login } from "./actions";
 
export default function LoginPage() {
  const initialState = {
    errors: [],
    values: {
      email: "",
    },
  };
 
  const [state, formAction, isPending] = useActionState(login, initialState);
 
  return (
    <>
      <Navbar />
      <BootstrapClient />
 
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center mb-4">Login</h3>
 
                {state.errors?.length > 0 && (
                  <div className="alert alert-danger">
                    {state.errors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
 
                <form action={formAction}>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
 
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      defaultValue={state.values?.email || ""}
                      required
                    />
                  </div>
 
                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      required
                    />
                  </div>
 
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isPending}
                  >
                    {isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}