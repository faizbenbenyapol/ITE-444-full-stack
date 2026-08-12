import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("ไม่สามารถโหลดข้อมูลสินค้าได้");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("เกิดข้อผิดพลาด:", error);
        setError("ไม่สามารถเชื่อมต่อกับ Server ได้");
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-vh-100 bg-body-tertiary">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container py-2">
          <a className="navbar-brand fw-bold" href="#">
            Product Store
          </a>

          <span className="text-secondary small">
            สินค้าทั้งหมด {products.length} รายการ
          </span>
        </div>
      </nav>

      <main className="container py-5">

        {/* Header */}
        <div className="row align-items-end mb-4 g-3">
          <div className="col-md">
            <p className="text-primary fw-semibold mb-1">
              PRODUCT CATALOG
            </p>

            <h1 className="fw-bold mb-2">
              รายการสินค้า
            </h1>

            <p className="text-secondary mb-0">
              เลือกดูสินค้าที่คุณสนใจจากรายการด้านล่าง
            </p>
          </div>

          {/* Search */}
          <div className="col-md-5 col-lg-4">
            <label
              htmlFor="search"
              className="form-label small fw-semibold"
            >
              ค้นหาสินค้า
            </label>

            <input
              id="search"
              type="text"
              className="form-control"
              placeholder="พิมพ์ชื่อสินค้า..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="mb-4" />

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
            />

            <p className="text-secondary mb-0">
              กำลังโหลดข้อมูลสินค้า...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="alert alert-danger text-center">
            <h5 className="fw-bold">
              เกิดข้อผิดพลาด
            </h5>

            <p className="mb-0">
              {error}
            </p>
          </div>
        )}

        {/* Product Count */}
        {!loading && !error && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-secondary small">
              พบ {filteredProducts.length} รายการ
            </span>
          </div>
        )}

        {/* Products */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={product.id}
              >
                <div className="card product-card h-100 border-0">

                  {/* Image */}
                  <div className="product-image-wrapper">
                    <img
                      src={product.img_url}
                      className="card-img-top product-image"
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/500x400/e9ecef/6c757d?text=Product+Image";
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="card-body d-flex flex-column p-4">

                    <div className="mb-4">
                      <span className="badge text-bg-light border mb-3">
                        Product #{product.id}
                      </span>

                      <h5 className="card-title fw-bold mb-2 product-title">
                        {product.name}
                      </h5>

                      <p className="text-secondary small mb-2">
                        ราคาสินค้า
                      </p>

                      <div>
                        <span className="fs-5 fw-bold text-primary">
                          {Number(product.price).toLocaleString()}
                        </span>

                        <span className="text-secondary ms-1">
                          บาท
                        </span>
                      </div>
                    </div>

                    <button
                      className="btn btn-dark w-100 mt-auto"
                      onClick={() =>
                        alert(
                          `${product.name}\nราคา ${Number(
                            product.price
                          ).toLocaleString()} บาท`
                        )
                      }
                    >
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Search */}
        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="empty-state text-center py-5">
              <h4 className="fw-bold mb-2">
                ไม่พบสินค้า
              </h4>

              <p className="text-secondary mb-3">
                ไม่พบสินค้าที่ตรงกับคำค้นหา "{search}"
              </p>

              <button
                className="btn btn-outline-dark"
                onClick={() => setSearch("")}
              >
                ล้างการค้นหา
              </button>
            </div>
          )}
      </main>

      {/* Footer */}
      <footer className="border-top bg-white mt-5">
        <div className="container py-4 text-center">
          <p className="text-secondary small mb-0">
            Product Store
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;