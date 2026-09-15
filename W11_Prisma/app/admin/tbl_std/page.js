import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteButton from "@/components/SweetAlertDel";
import SuccessAlertStd from "@/components/SuccessAlertStd";

export default async function Home() {
  // ฟังก์ชันลบข้อมูล
  async function deleteStd(formData) {
    "use server";
    const id = formData.get("id");

    await prisma.tbl_std.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath("/admin/tbl_std");
  }

  // ดึงข้อมูลด้วย Prisma แทน SQL SELECT
  const stds = await prisma.tbl_std.findMany();

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />
      <SuccessAlertStd />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>รายการนักศึกษา</h1>
          <Link href="/admin/tbl_std/create" className="btn btn-primary btn-sm">
            + ข้อมูล
          </Link>
        </div>

        <table className="table table-bordered table-hover">
          <thead>
            <tr className="table-light">
              <th className="text-center">ลำดับ</th>
              <th>รหัสนักศึกษา</th>
              <th>ชื่อนักศึกษา</th>
              <th className="text-center">edit</th>
              <th className="text-center">remove</th>
            </tr>
          </thead>
          <tbody>
            {stds.map((std, index) => (
              <tr key={std.id}>
                {/* รันลำดับ 1, 2, 3... ตาม index */}
                <td className="text-center">{index + 1}</td>
                <td>{std.std_code}</td>
                <td>{std.std_name}</td>
                <td className="text-center">
                  <Link
                    href={`/admin/tbl_std/update/${std.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    edit
                  </Link>
                </td>
                <td className="text-center">
                  <form action={deleteStd}>
                    <input type="hidden" name="id" value={std.id} />
                    <DeleteButton />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}