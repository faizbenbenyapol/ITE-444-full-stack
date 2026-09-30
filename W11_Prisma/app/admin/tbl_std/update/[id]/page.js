import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditStdForm from "@/components/EditStdForm";

export default async function EditStdPage({ params }) {
  const { id } = await params;

  const std = await prisma.tbl_std.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!std) {
    return (
      <div className="container mt-5">
        <p>ไม่พบข้อมูล</p>
      </div>
    );
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />
      <div className="container mt-5">
        <h1 className="mb-4">แก้ไขข้อมูล</h1>
        <EditStdForm std={std} />
      </div>
    </>
  );
}