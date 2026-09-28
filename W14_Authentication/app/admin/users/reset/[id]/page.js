import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditResetPasswordForm from "@/components/EditResetPasswordForm";


export default async function EditResetPasswordPage({ params }) {

    const { id } = await params;

    // ดึงข้อมูลเดิม
    const ResetPasswords = await prisma.tbl_user.findUnique({
            where: {
                id: Number(id)
            }
        });

    

    // ถ้าไม่พบ 
    if (!ResetPasswords) {

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
                   Reset Password 
                </h1>

                   <EditResetPasswordForm
                    ResetPasswords={ResetPasswords}
                />

            </div>

        </>

    );

}