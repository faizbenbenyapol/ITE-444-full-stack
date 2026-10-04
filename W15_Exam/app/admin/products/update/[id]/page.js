import prisma from "@/lib/prisma";
import EditProductForm from "@/components/EditProductForm";

export default async function EditProductPage({ params }) {
  const { id } = await params;

  const product = await prisma.products.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">ไม่พบข้อมูลสินค้า</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">แก้ไขข้อมูลสินค้า</h1>
      {/* Decimal ของ Prisma ส่งเข้า Client Component ตรง ๆ ไม่ได้ → แปลงเป็น string ก่อน */}
      <EditProductForm product={{ ...product, price: product.price.toString() }} />
    </div>
  );
}
