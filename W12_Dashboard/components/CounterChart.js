"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Bar, Line, Doughnut, PolarArea } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// พาเลตต์สีแบบ Vibrant & Clean
const VIBRANT_COLORS = {
  bars: [
    "#3b82f6", // ม.ค. - ฟ้าสด
    "#8b5cf6", // ก.พ. - ม่วง
    "#ec4899", // มี.ค. - ชมพู
    "#f43f5e", // เม.ย. - แดงกุหลาบ
    "#f97316", // พ.ค. - ส้มสด
    "#eab308", // มิ.ย. - เหลืองอำพัน
    "#10b981", // ก.ค. - เขียวมรกต
    "#06b6d4", // ส.ค. - ฟ้าน้ำทะเล
    "#6366f1", // ก.ย. - คราม
    "#d946ef", // ต.ค. - บานเย็น
    "#14b8a6", // พ.ย. - เขียวหัวเป็ด
    "#f59e0b"  // ธ.ค. - ส้มทอง
  ],
  doughnut: [
    "#6366f1", // Indigo
    "#06b6d4", // Cyan
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#f43f5e"  // Rose
  ],
  polar: [
    "rgba(59, 130, 246, 0.75)",  // ฟ้า
    "rgba(16, 185, 129, 0.75)",  // เขียว
    "rgba(245, 158, 11, 0.75)",  // ส้ม
    "rgba(244, 63, 94, 0.75)"    // แดง
  ]
};

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 800,
    easing: "easeOutQuart"
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        font: { size: 11 },
        color: "#64748b",
        padding: 15
      }
    },
    tooltip: {
      backgroundColor: "#1e293b",
      padding: { top: 8, bottom: 8, left: 12, right: 12 },
      cornerRadius: 6
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#64748b", font: { size: 11 } }
    },
    y: {
      grid: { color: "#f1f5f9" },
      ticks: { color: "#64748b", font: { size: 11 } },
      border: { dash: [3, 3], display: false }
    }
  }
};

export default function CounterChart({ data = [], productStockData = [], priceTierData = [4, 6, 3, 2] }) {
  const labels = data?.map((item) => item.month) || [];
  const values = data?.map((item) => item.total) || [];

  const cumulativeValues = values.reduce((acc, curr) => {
    const prevSum = acc.length > 0 ? acc[acc.length - 1] : 0;
    return [...acc, prevSum + curr];
  }, []);

  // 1. กราฟแท่ง: แยกสีสดใสรายเดือน
  const barData = {
    labels,
    datasets: [
      {
        label: "ผู้เข้าชม (ครั้ง)",
        data: values,
        backgroundColor: VIBRANT_COLORS.bars,
        borderRadius: 6,
        barThickness: 18
      }
    ]
  };

  // 2. กราฟเส้น: สีฟ้า Cyan มีมาร์กเกอร์สีขาวสด
  const lineData = {
    labels,
    datasets: [
      {
        label: "ยอดสะสม (ครั้ง)",
        data: cumulativeValues,
        borderColor: "#0284c7",
        borderWidth: 2.5,
        backgroundColor: "rgba(2, 132, 199, 0.12)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#0284c7",
        pointBorderWidth: 2
      }
    ]
  };

  // 3. กราฟโดนัท: สีตัดกันชัดเจน
  const doughnutData = {
    labels: productStockData?.length > 0 ? productStockData.map((p) => p.name) : ["ไม่มีข้อมูล"],
    datasets: [
      {
        data: productStockData?.length > 0 ? productStockData.map((p) => p.stock) : [0],
        backgroundColor: VIBRANT_COLORS.doughnut,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 6,
        cutout: "75%"
      }
    ]
  };

  // 4. กราฟ Polar Area
  const polarData = {
    labels: ["ต่ำกว่า 1,000", "1,000 - 5,000", "5,001 - 20,000", "มากกว่า 20,000"],
    datasets: [
      {
        data: priceTierData,
        backgroundColor: VIBRANT_COLORS.polar,
        borderColor: "#ffffff",
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="row g-3">
      {/* กราฟที่ 1: กราฟแท่ง */}
      <div className="col-12 col-xl-8">
        <div className="card border-0 bg-white rounded-3 shadow-sm h-100 chart-card">
          <div className="card-header bg-transparent border-bottom py-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="fw-bold text-dark d-block">สถิติผู้เข้าชมรายเดือน</span>
              <small className="text-secondary">ปริมาณการเปิดหน้าเว็บแยกตามเดือน ปี 2026</small>
            </div>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">รายเดือน</span>
          </div>
          <div className="card-body" style={{ height: "300px" }}>
            <Bar data={barData} options={baseOptions} />
          </div>
        </div>
      </div>

      {/* กราฟที่ 2: กราฟโดนัท */}
      <div className="col-12 col-xl-4">
        <div className="card border-0 bg-white rounded-3 shadow-sm h-100 chart-card">
          <div className="card-header bg-transparent border-bottom py-3">
            <span className="fw-bold text-dark d-block">สัดส่วนสต็อกสินค้า</span>
            <small className="text-secondary">5 อันดับสินค้าที่มีจำนวนสต็อกสูงสุด</small>
          </div>
          <div className="card-body d-flex align-items-center justify-content-center" style={{ height: "300px" }}>
            <div style={{ width: "220px", height: "220px" }}>
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { boxWidth: 8, font: { size: 10 } }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* กราฟที่ 3: กราฟเส้น */}
      <div className="col-12 col-xl-7">
        <div className="card border-0 bg-white rounded-3 shadow-sm h-100 chart-card">
          <div className="card-header bg-transparent border-bottom py-3">
            <span className="fw-bold text-dark d-block">แนวโน้มการเติบโตสะสม</span>
            <small className="text-secondary">ทราฟฟิกรวมสะสมตลอดทั้งปี</small>
          </div>
          <div className="card-body" style={{ height: "280px" }}>
            <Line data={lineData} options={baseOptions} />
          </div>
        </div>
      </div>

      {/* กราฟที่ 4: กราฟ Polar Area */}
      <div className="col-12 col-xl-5">
        <div className="card border-0 bg-white rounded-3 shadow-sm h-100 chart-card">
          <div className="card-header bg-transparent border-bottom py-3">
            <span className="fw-bold text-dark d-block">โครงสร้างช่วงราคาสินค้า</span>
            <small className="text-secondary">การกระจายตัวของจำนวนสินค้าตามช่วงราคา (บาท)</small>
          </div>
          <div className="card-body d-flex align-items-center justify-content-center" style={{ height: "280px" }}>
            <div style={{ width: "220px", height: "220px" }}>
              <PolarArea
                data={polarData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
                      labels: { boxWidth: 8, font: { size: 10 } }
                    }
                  },
                  scales: {
                    r: { ticks: { display: false }, grid: { color: "#f1f5f9" } }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}