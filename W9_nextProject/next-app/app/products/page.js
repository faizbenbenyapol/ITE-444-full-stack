import Link from "next/link";
import Navbar from "../components/navbar";
import BootstrapClient from "../components/BootstrapClient";
import db from "../../lib/db";

export default async function ProductsPage() {
  const [products] = await db.query("SELECT * FROM products");

  return (
    <>
      <Navbar />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">Our Products</h1>

        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-md-4 col-lg-3 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.img_url}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-success fw-bold fs-5">
                      ฿{Number(product.price).toLocaleString()}
                    </p>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="btn btn-primary w-100 mt-2"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}