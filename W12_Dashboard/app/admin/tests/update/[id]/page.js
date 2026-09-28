import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditTestForm from "@/components/EditTestForm";
import { notFound } from "next/navigation";

export default async function EditTestPage({ params }) {
  const { id } = await params;

  // ดึงข้อมูลเดิมจากฐานข้อมูลตาม ID
  const test = await prisma.tbl_test.findUnique({
    where: {
      id: Number(id),
    },
  });

  // ถ้าไม่พบข้อมูลให้แสดงหน้า 404
  if (!test) {
    notFound();
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />
      <div className="container mt-5">
        <h1 className="mb-4">แก้ไขข้อมูล</h1>
        <EditTestForm test={test} />
      </div>
    </>
  );
}