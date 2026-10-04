import prisma from "@/lib/prisma";

// หน้าหลัก: แสดงสินค้าทั้งหมด (อ่านอย่างเดียว)
export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.products.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="container mt-5">
      <h1 className="mb-4">รายการสินค้า</h1>

      <div className="row">
        {products.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
            <div className="card h-100">
              <img src={product.img_url} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  ราคา {Number(product.price).toLocaleString()} บาท
                </p>
                <p className="card-text text-muted">คงเหลือ {product.stock} ชิ้น</p>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && <p className="text-muted">ไม่พบข้อมูล</p>}
      </div>
    </div>
  );
}
