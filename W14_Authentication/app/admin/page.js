import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CounterChart from "@/components/CounterChart";
import Link from "next/link";

export default async function Dashboard() {
  const totalProducts = await prisma.products.count();

  const stockAgg = await prisma.products.aggregate({
    _sum: { stock: true },
    _avg: { price: true }
  });
  const totalStock = stockAgg._sum.stock || 0;
  const avgPrice = Math.round(stockAgg._avg.price || 0);

  const totalViews = await prisma.tbl_counter.count();

  const topStockProducts = await prisma.products.findMany({
    take: 5,
    orderBy: { stock: "desc" },
    select: { name: true, stock: true }
  });

  const allProducts = await prisma.products.findMany({ select: { price: true } });
  const tier1 = allProducts.filter((p) => p.price < 1000).length;
  const tier2 = allProducts.filter((p) => p.price >= 1000 && p.price <= 5000).length;
  const tier3 = allProducts.filter((p) => p.price > 5000 && p.price <= 20000).length;
  const tier4 = allProducts.filter((p) => p.price > 20000).length;
  const priceTierData = [tier1, tier2, tier3, tier4];

  const counterData = await prisma.$queryRaw`
    SELECT
      MONTH(dateCreate) AS month,
      COUNT(*) AS total
    FROM tbl_counter
    WHERE YEAR(dateCreate) = 2026
    GROUP BY MONTH(dateCreate)
    ORDER BY month
  `;

  const monthNames = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];

  const chartData = counterData.map((item) => ({
    month: monthNames[Number(item.month) - 1],
    total: Number(item.total)
  }));

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* สไตล์การ Hover และ Micro-interactions */}
      <style>{`
        .metric-card, .chart-card {
          transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
          border-color: #e2e8f0 !important;
        }
        .metric-card:hover, .chart-card:hover {
          transform: translateY(-2px);
          border-color: #cbd5e1 !important;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05) !important;
        }
        .icon-box {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
      `}</style>

      <NavbarAdmin />
      <BootstrapClient />

      <div className="container py-4">
        {/* แถบหัวข้อหน้า Dashboard */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h4 className="fw-bold text-dark mb-0">ภาพรวมระบบและสถิติ</h4>
              <span className="badge bg-dark-subtle text-dark border px-2 py-1 small">สถานะพร้อมใช้งาน</span>
            </div>
            <p className="text-secondary small mb-0">รายงานภาพรวมสินค้า ทราฟฟิก และสถิติผู้เข้าชม</p>
          </div>
          <div className="d-flex gap-2 align-items-center mt-2 mt-md-0">
            <span className="badge bg-white text-secondary border px-3 py-2 fw-normal shadow-sm">
              <i className="bi bi-circle-fill text-success me-1" style={{ fontSize: 7 }}></i>
              เชื่อมต่อฐานข้อมูลแล้ว (เวลาไทย)
            </span>
            <Link href="/" className="btn btn-dark btn-sm px-3 shadow-sm">
              <i className="bi bi-arrow-up-right me-1"></i> หน้าร้านค้า
            </Link>
          </div>
        </div>

        {/* แถวที่ 1: การ์ด KPI */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card bg-white rounded-3 shadow-sm p-3 h-100 metric-card">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-secondary small fw-medium">จำนวนสินค้าทั้งหมด</span>
                <div className="icon-box bg-light text-dark">
                  <i className="bi bi-box-seam"></i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-1">{totalProducts.toLocaleString()}</h3>
              <div className="d-flex align-items-center gap-1 small text-muted">
                <i className="bi bi-check2 text-primary"></i> รายการในระบบ
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card bg-white rounded-3 shadow-sm p-3 h-100 metric-card">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-secondary small fw-medium">สต็อกรวมทั้งหมด</span>
                <div className="icon-box bg-light text-dark">
                  <i className="bi bi-layers"></i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-1">{totalStock.toLocaleString()}</h3>
              <div className="d-flex align-items-center gap-1 small text-muted">
                <i className="bi bi-archive text-primary"></i> ชิ้นพร้อมจำหน่าย
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card bg-white rounded-3 shadow-sm p-3 h-100 metric-card">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-secondary small fw-medium">ราคาเฉลี่ยต่อชิ้น</span>
                <div className="icon-box bg-light text-dark">
                  <i className="bi bi-tag"></i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-1">฿{avgPrice.toLocaleString()}</h3>
              <div className="d-flex align-items-center gap-1 small text-muted">
                <i className="bi bi-calculator text-primary"></i> คำนวณจากทุกรายการ
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card bg-white rounded-3 shadow-sm p-3 h-100 metric-card">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-secondary small fw-medium">ยอดการเข้าชมรวม</span>
                <div className="icon-box bg-light text-dark">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-1">{totalViews.toLocaleString()}</h3>
              <div className="d-flex align-items-center gap-1 small text-success">
                <i className="bi bi-record-fill"></i> ระบบบันทึกอัตโนมัติ
              </div>
            </div>
          </div>
        </div>

        {/* แถวที่ 2: แสดงกราฟทั้ง 4 แบบ */}
        <div className="mb-2">
          <CounterChart
            data={chartData}
            productStockData={topStockProducts}
            priceTierData={priceTierData}
          />
        </div>
      </div>
    </div>
  );
}