import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditUserForm from "@/components/EditUserForm";


export default async function EditUserPage({ params }) {

    const { id } = await params;

    // ดึงข้อมูลเดิม
    const users = await prisma.tbl_user.findUnique({
            where: {
                id: Number(id)
            }
        });

    

    // ถ้าไม่พบ 
    if (!users) {

        return (

            <>
                <NavbarAdmin />

                <BootstrapClient />

                <div className="container mt-5">

                    <div className="alert alert-danger">

                        ไม่พบข้อมูล 

                    </div>

                </div>

            </>

        );

    }


    return (

        <>

            <NavbarAdmin />

            <BootstrapClient />


            <div className="container mt-5">

                <h1 className="mb-4">
                    แก้ไขข้อมูล 
                </h1>

                   <EditUserForm
                    users={users}
                />

            </div>

        </>

    );

}