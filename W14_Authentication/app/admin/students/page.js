import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import SuccessAlert from "@/components/SuccessAlert";
import DeleteButton from "@/components/SweetAlertDel";

export default async function StudentPage() {
  const students = await prisma.student.findMany({
    orderBy: { id: "desc" },
  });

  async function deleteStudent(formData) {
    "use server";
    const id = formData.get("id");
    await prisma.student.delete({
      where: { id: Number(id) },
    });
    // ลบเสร็จแล้วส่ง ?success=delete กลับไป เพื่อให้ SuccessAlert แสดง SweetAlert
    redirect("/admin/students?success=delete");
  }

  return (
    <>
      <SuccessAlert />
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h2 className="mb-4 d-flex align-items-center gap-2">
          รายชื่อนักศึกษา
          <Link
            href="/admin/students/create"
            className="btn btn-primary btn-sm"
          >
            + เพิ่มนักศึกษา
          </Link>
        </h2>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">รหัสนักศึกษา</th>
                <th scope="col">ชื่อ-นามสกุล</th>
                <th scope="col">สาขาวิชา</th>
                <th scope="col">วันที่สร้าง</th>
                <th scope="col" className="text-center">edit</th>
                <th scope="col" className="text-center">remove</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td className="fw-semibold">{student.student_code}</td>
                  <td>{student.student_name}</td>
                  <td>{student.student_major}</td>
                  <td>{new Date(student.dateCreate).toLocaleString("th-TH")}</td>
                  <td className="text-center">
                    <Link
                      href={`/admin/students/update/${student.id}`}
                      className="btn btn-primary btn-sm px-3"
                    >
                      edit
                    </Link>
                  </td>
                  <td className="text-center">
                    <form action={deleteStudent}>
                      <input type="hidden" name="id" value={student.id} />
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
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