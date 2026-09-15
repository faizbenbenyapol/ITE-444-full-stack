import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreateTestForm from "@/components/CreateTestForm";

export default function CreateTest() {
  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />
      <div className="container mt-5">
        <h2 className="mb-4">เพิ่มข้อมูล</h2>
        <CreateTestForm />
      </div>
    </>
  );
}