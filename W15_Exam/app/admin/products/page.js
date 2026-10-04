import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import SuccessAlert from "@/components/SuccessAlert";
import DeleteButton from "@/components/SweetAlertDel";

// หน้าจัดการ: ตาราง + ปุ่ม เพิ่ม / แก้ไข / ลบ
export const dynamic = "force-dynamic";

export default async function ProductsAdmin() {
  const products = await prisma.products.findMany({
    orderBy: { id: "desc" },
  });

  // DELETE
  async function deleteProduct(formData) {
    "use server";
    const id = formData.get("id");
    await prisma.products.delete({
      where: { id: Number(id) },
    });
    // ส่ง ?success=delete กลับไป ให้ SuccessAlert เด้ง SweetAlert
    redirect("/admin/products?success=delete");
  }

  return (
    <>
      <SuccessAlert />

      <div className="container mt-5">
        <h1 className="mb-4 d-flex align-items-center gap-2">
          จัดการสินค้า
          <Link className="btn btn-primary btn-sm" href="/admin/products/create">
            + เพิ่มสินค้า
          </Link>
        </h1>

        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">รูป</th>
                <th>ชื่อสินค้า</th>
                <th className="text-end">ราคา</th>
                <th className="text-center">QTY</th>
                <th className="text-center">edit</th>
                <th className="text-center">remove</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="text-center">{product.id}</td>
                  <td className="text-center">
                    <img src={product.img_url} alt={product.name} width="100" />
                  </td>
                  <td>{product.name}</td>
                  <td className="text-end">{Number(product.price).toLocaleString()} บาท</td>
                  <td className="text-center">{product.stock}</td>
                  <td className="text-center">
                    <Link
                      href={`/admin/products/update/${product.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      edit
                    </Link>
                  </td>
                  <td className="text-center">
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={product.id} />
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
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
