import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreateUserForm from "@/components/CreateUserForm";

export default function CreateUser() {
    return (
        <>
            <NavbarAdmin />
            <BootstrapClient />
            <div className="container mt-5">
                <h1 className="mb-4">
                    เพิ่มข้อมูล
                </h1>
                <CreateUserForm />
            </div>

        </>
    );
}

