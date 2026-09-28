import prisma from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import SuccessAlertTest from "@/components/SuccessAlertTest";
import DeleteButton from "@/components/SweetAlertDel";

export default async function TestPage() {
  const tests = await prisma.tbl_test.findMany({
    orderBy: { id: "asc" },
  });

  async function deleteTest(formData) {
    "use server";
    const id = formData.get("id");
    await prisma.tbl_test.delete({
      where: {
        id: Number(id),
      },
    });
    revalidatePath("/admin/tests");
  }

  return (
    <>
      <SuccessAlertTest />
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h2 className="mb-4 d-flex align-items-center gap-2">
          รายการทดสอบ
          <Link
            href="/admin/tests/create"
            className="btn btn-primary btn-sm"
          >
            + ข้อมูล
          </Link>
        </h2>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Lastname</th>
                <th scope="col" className="text-center">edit</th>
                <th scope="col" className="text-center">remove</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={test.id}>
                  {/* แสดงลำดับ 1, 2, 3... เสมอ */}
                  <td>{index + 1}</td>
                  <td>{test.name}</td>
                  <td>{test.lastname}</td>
                  <td className="text-center">
                    <Link
                      href={`/admin/tests/update/${test.id}`}
                      className="btn btn-warning btn-sm px-3"
                    >
                      edit
                    </Link>
                  </td>
                  <td className="text-center">
                    <form action={deleteTest}>
                      <input type="hidden" name="id" value={test.id} />
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))}

              {tests.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}