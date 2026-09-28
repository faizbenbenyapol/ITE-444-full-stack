import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteButton from "@/components/SweetAlertDel";
import SuccessAlertUser from "@/components/SuccessAlertUser";
import { Colors } from "chart.js";

export default async function Home() {

async function deleteUser(formData) {
    "use server";

    const id = formData.get("id");
        await prisma.tbl_user.delete({
            where: {
                id: Number(id)
            }
        });
    revalidatePath("/admin/users");
}


  const Users =
        await prisma.tbl_user.findMany();


    return (
        <>
            <SuccessAlertUser />
            <NavbarAdmin />
            <BootstrapClient />

            <div className="container mt-5">

                <h1 className="mb-4">
                    รายการสมาชิก
                    <Link className="btn btn-primary btn-sm" href="/admin/users/create">
                                        + ข้อมูล
                        </Link>

                </h1>

                <div className="row">

            <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead>
                <tr>
                  <th width="5%" className="text-center">No.</th>
                  <th width="50%">Name</th>
                  <th width="20%">Email</th>
                  <th width="10%">Role</th>
                  <th width="5%" className="text-center">edit</th>
                  <th width="5%" className="text-center">pwd</th>
                  <th width="5%" className="text-center">remove</th>
                </tr>
              </thead>

              <tbody>
                {Users.map((Users) => (
                  <tr key={Users.id}>
                    <td className="text-center">{Users.id}</td>
                    <td>{Users.name}</td>
                    <td>{Users.email}</td>
                     <td>{Users.role}</td>

                    <td className="text-center">
                      <Link
                        href={`/admin/users/update/${Users.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        edit
                      </Link>
                    </td>

                    <td className="text-center">
                      <Link
                         href={`/admin/users/reset/${Users.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        reset
                      </Link>
                    </td>

                    <td className="text-center">
                      
              <form action={deleteUser}>
                    <input
                        type="hidden"
                        name="id"
                        value={Users.id}
                    />
                  <DeleteButton />
                  </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          
          </div>


                </div>

            </div>
        </>
    );
}

