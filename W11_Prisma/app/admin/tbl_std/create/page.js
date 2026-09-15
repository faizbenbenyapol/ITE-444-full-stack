import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreateStdForm from "@/components/CreateStdForm";

export default function CreateStd() {
  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />
      <div className="container mt-5">
        <h1 className="mb-4">เพิ่มข้อมูล</h1>
        <CreateStdForm />
      </div>
    </>
  );
}