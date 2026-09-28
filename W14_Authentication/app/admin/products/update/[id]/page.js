import db from "@/lib/db";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditProductForm from "@/components/EditProductForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;

  const [products] = await db.query(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );
  const product = products[0];

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">ไม่พบข้อมูลสินค้า</div>
      </div>
    );
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">แก้ไขข้อมูลสินค้า</h1>
        <EditProductForm product={product} />
      </div>
    </>
  );
}