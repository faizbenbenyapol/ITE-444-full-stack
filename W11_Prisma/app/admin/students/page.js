import db from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import SuccessAlert from "@/components/SuccessAlert";
import DeleteButton from "@/components/SweetAlertDel";

export default async function StudentPage() {
  const [students] = await db.query(
    "SELECT * FROM student ORDER BY id DESC"
  );

  async function deleteStudent(formData) {
    "use server";
    const id = formData.get("id");
    await db.query("DELETE FROM student WHERE id = ?", [id]);
    revalidatePath("/admin/students");
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