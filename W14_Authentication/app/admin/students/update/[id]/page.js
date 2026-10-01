import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditStudentForm from "@/components/EditStudentForm";

export default async function EditStudentPage({ params }) {
  const { id } = await params;

  // ดึงข้อมูลเดิม
  const student = await prisma.student.findUnique({
    where: { id: Number(id) },
  });

  if (!student) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">ไม่พบข้อมูลนักศึกษา</div>
      </div>
    );
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />
      <div className="container mt-5">
        <h2 className="mb-4">แก้ไขข้อมูลนักศึกษา</h2>
        <EditStudentForm student={student} />
      </div>
    </>
  );
}