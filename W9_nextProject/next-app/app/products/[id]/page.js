import db from "@/lib/db";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import BootstrapClient from "@/app/components/BootstrapClient";

export default async function ProductDetail({ params }) {
  // รับค่า id จาก URL (Next.js App Router ต้อง await params)
  const { id } = await params;

  // Query ข้อมูลสินค้าตาม id
  const [products] = await db.query(
    "SELECT * FROM products WHERE id = ?",
    [id]
  );

  const product = products[0];

  // กรณีหา id สินค้าไม่เจอ
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <h2 className="text-danger">ไม่พบสินค้านี้</h2>
          <Link href="/products" className="btn btn-secondary mt-3">
            กลับหน้ารายการสินค้า
          </Link>
        </div>
      </>
    );
  }

  // แสดงผลรายละเอียดสินค้า
  return (
    <>
      <Navbar />
      <BootstrapClient />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <img
              src={product.img_url}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="fw-bold">{product.name}</h1>
            <h3 className="text-success my-3">
              ฿{Number(product.price).toLocaleString()}
            </h3>
            <p className="lead text-muted">{product.description}</p>
            <hr />
            <div className="d-flex gap-3">
              <button className="btn btn-success btn-lg">ซื้อสินค้า</button>
              <Link href="/products" className="btn btn-outline-secondary btn-lg">
                ย้อนกลับ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}