import { useState } from "react";
import {
  LayoutGrid,
  UtensilsCrossed,
  GlassWater,
  IceCream,
  Coffee,
  RotateCcw,
  X,
} from "lucide-react";

// กำหนดสีของแต่ละหมวดหมู่ตามรูปภาพ
const CATEGORIES = [
  { id: "all", label: "ทั้งหมด", icon: LayoutGrid, color: "#0d9488" },
  { id: "set", label: "อาหารเซ็ต", icon: UtensilsCrossed, color: "#16a34a" },
  { id: "single", label: "อาหารจานเดียว", icon: UtensilsCrossed, color: "#0284c7" },
  { id: "drink", label: "เครื่องดื่ม", icon: GlassWater, color: "#dc2626" },
  { id: "dessert", label: "ของหวาน", icon: IceCream, color: "#eab308" },
  { id: "coffee", label: "กาแฟ", icon: Coffee, color: "#475569" },
];

// เพิ่มรายการสินค้าจำลองให้ครบ 24 ชิ้น ตามตัวอย่างในรูป
const PRODUCTS = [
  // แถวที่ 1: ข้าวไข่เจียวหมูสับ 6 รายการ
  { id: "p1_1", name: "ข้าวไข่เจียวหมูสับ", price: 60, category: "single", img: "https://devbanban.com/app/foodpos/p_img/104599236620190428_221506.png" },
  { id: "p1_2", name: "ข้าวไข่เจียวหมูสับ", price: 60, category: "single", img: "https://devbanban.com/app/foodpos/p_img/104599236620190428_221506.png" },
  { id: "p1_3", name: "ข้าวไข่เจียวหมูสับ", price: 60, category: "single", img: "https://devbanban.com/app/foodpos/p_img/104599236620190428_221506.png" },
  { id: "p1_4", name: "ข้าวไข่เจียวหมูสับ", price: 60, category: "single", img: "https://devbanban.com/app/foodpos/p_img/104599236620190428_221506.png" },
  { id: "p1_5", name: "ข้าวไข่เจียวหมูสับ", price: 60, category: "single", img: "https://devbanban.com/app/foodpos/p_img/104599236620190428_221506.png" },
  { id: "p1_6", name: "ข้าวไข่เจียวหมูสับ", price: 60, category: "single", img: "https://devbanban.com/app/foodpos/p_img/104599236620190428_221506.png" },

  // แถวที่ 2: อเมริกาโน (เย็น) 6 รายการ
  { id: "p2_1", name: "อเมริกาโน (เย็น)", price: 60, category: "coffee", img: "https://devbanban.com/app/coffee/p_img/126798917220190225_110423.jpg" },
  { id: "p2_2", name: "อเมริกาโน (เย็น)", price: 60, category: "coffee", img: "https://devbanban.com/app/coffee/p_img/126798917220190225_110423.jpg" },
  { id: "p2_3", name: "อเมริกาโน (เย็น)", price: 60, category: "coffee", img: "https://devbanban.com/app/coffee/p_img/126798917220190225_110423.jpg" },
  { id: "p2_4", name: "อเมริกาโน (เย็น)", price: 60, category: "coffee", img: "https://devbanban.com/app/coffee/p_img/126798917220190225_110423.jpg" },
  { id: "p2_5", name: "อเมริกาโน (เย็น)", price: 60, category: "coffee", img: "https://devbanban.com/app/coffee/p_img/126798917220190225_110423.jpg" },
  { id: "p2_6", name: "อเมริกาโน (เย็น)", price: 60, category: "coffee", img: "https://devbanban.com/app/coffee/p_img/126798917220190225_110423.jpg" },

  // แถวที่ 3: กะเพราไก่ไข่ดาว 6 รายการ
  { id: "p3_1", name: "กะเพราไก่ไข่ดาว", price: 80, category: "single", img: "https://devbanban.com/app/foodpos/p_img/167208652420190428_221354.jpeg" },
  { id: "p3_2", name: "กะเพราไก่ไข่ดาว", price: 80, category: "single", img: "https://devbanban.com/app/foodpos/p_img/167208652420190428_221354.jpeg" },
  { id: "p3_3", name: "กะเพราไก่ไข่ดาว", price: 80, category: "single", img: "https://devbanban.com/app/foodpos/p_img/167208652420190428_221354.jpeg" },
  { id: "p3_4", name: "กะเพราไก่ไข่ดาว", price: 80, category: "single", img: "https://devbanban.com/app/foodpos/p_img/167208652420190428_221354.jpeg" },
  { id: "p3_5", name: "กะเพราไก่ไข่ดาว", price: 80, category: "single", img: "https://devbanban.com/app/foodpos/p_img/167208652420190428_221354.jpeg" },
  { id: "p3_6", name: "กะเพราไก่ไข่ดาว", price: 80, category: "single", img: "https://devbanban.com/app/foodpos/p_img/167208652420190428_221354.jpeg" },

  // แถวที่ 4: พุดดิ้งนมสด 6 รายการ
  { id: "p4_1", name: "พุดดิ้งนมสด", price: 40, category: "dessert", img: "https://devbanban.com/app/coffee/p_img/f106533583120190225_140101.jpg" },
  { id: "p4_2", name: "พุดดิ้งนมสด", price: 40, category: "dessert", img: "https://devbanban.com/app/coffee/p_img/f106533583120190225_140101.jpg" },
  { id: "p4_3", name: "พุดดิ้งนมสด", price: 40, category: "dessert", img: "https://devbanban.com/app/coffee/p_img/f106533583120190225_140101.jpg" },
  { id: "p4_4", name: "พุดดิ้งนมสด", price: 40, category: "dessert", img: "https://devbanban.com/app/coffee/p_img/f106533583120190225_140101.jpg" },
  { id: "p4_5", name: "พุดดิ้งนมสด", price: 40, category: "dessert", img: "https://devbanban.com/app/coffee/p_img/f106533583120190225_140101.jpg" },
  { id: "p4_6", name: "พุดดิ้งนมสด", price: 40, category: "dessert", img: "https://devbanban.com/app/coffee/p_img/f106533583120190225_140101.jpg" },
];

const THB = (n) =>
  "฿" + n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function POSApp() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [vatOn, setVatOn] = useState(false);
  const [heldBills, setHeldBills] = useState([]);
  const [showPay, setShowPay] = useState(false);
  const [cashReceived, setCashReceived] = useState("");
  const [toast, setToast] = useState(null);

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  /* eslint-disable-next-line no-unused-vars */
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setVatOn(false);
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const safeDiscount = Math.min(discount || 0, subtotal);
  const vatAmount = vatOn ? (subtotal - safeDiscount) * 0.07 : 0;
  const total = subtotal - safeDiscount + vatAmount;
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const holdBill = () => {
    if (cart.length === 0) return;
    setHeldBills((prev) => [
      ...prev,
      { id: Date.now(), items: cart, discount: safeDiscount, vatOn, total },
    ]);
    clearCart();
    showToast("พักบิลแล้ว");
  };

  const resumeBill = (billId) => {
    const bill = heldBills.find((b) => b.id === billId);
    if (!bill) return;
    setCart(bill.items);
    setDiscount(bill.discount);
    setVatOn(bill.vatOn);
    setHeldBills((prev) => prev.filter((b) => b.id !== billId));
  };

  const deleteHeldBill = (billId) =>
    setHeldBills((prev) => prev.filter((b) => b.id !== billId));

  const change =
    cashReceived !== "" && Number(cashReceived) >= total
      ? Number(cashReceived) - total
      : null;

  const completePayment = () => {
    showToast(`ชำระเงินเรียบร้อย ${THB(total)}`);
    clearCart();
    setShowPay(false);
    setCashReceived("");
  };

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh", color: "#1e293b" }}>
      {/* Header / Navbar สีฟ้าตามรูป */}
      <nav style={{ backgroundColor: "#0284c7", color: "white", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", fontSize: "16px" }}>
          <span style={{ backgroundColor: "#a855f7", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>B</span>
          ร้านบ้านๆ
        </div>
        <div style={{ display: "flex", gap: "20px", fontSize: "13px" }}>
          <span style={{ cursor: "pointer" }}>ขายหน้าร้าน</span>
          <span style={{ cursor: "pointer", opacity: 0.9 }}>ขายออนไลน์</span>
          <span style={{ cursor: "pointer", opacity: 0.9 }}>ตั้งค่า</span>
          <span style={{ cursor: "pointer", opacity: 0.9 }}>รายงาน</span>
        </div>
      </nav>

      {/* Main Layout */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "16px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "16px" }}>
        {/* ฝั่งซ้าย: หมวดหมู่ + สินค้า */}
        <div>
          {/* ปุ่มหมวดหมู่หลากสี */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: active ? cat.color : "#334155",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* ตารางสินค้า 6 คอลัมน์ */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px" }}>
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: "100%", height: "90px", objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "6px 4px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "600", color: "#1e293b", height: "28px", overflow: "hidden", lineHeight: "1.3" }}>
                    {product.name}
                  </div>
                  <div style={{ color: "#334155", fontWeight: "bold", fontSize: "11px", marginTop: "2px" }}>
                    {THB(product.price)}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* บิลพักไว้ */}
          {heldBills.length > 0 && (
            <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "12px", marginTop: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
                บิลที่พักไว้ ({heldBills.length})
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {heldBills.map((bill) => (
                  <div key={bill.id} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
                    <span>{bill.items.reduce((s, i) => s + i.qty, 0)} รายการ · {THB(bill.total)}</span>
                    <button onClick={() => resumeBill(bill.id)} style={{ border: "none", background: "none", cursor: "pointer", color: "#0284c7" }}><RotateCcw size={13} /></button>
                    <button onClick={() => deleteHeldBill(bill.id)} style={{ border: "none", background: "none", cursor: "pointer", color: "#ef4444" }}><X size={13} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ฝั่งขวา: รายการสั่งซื้อ / ตะกร้า */}
        <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "16px", display: "flex", flexDirection: "column", height: "fit-content" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>รายการปัจจุบัน ({itemCount})</span>
            <button onClick={clearCart} disabled={cart.length === 0} style={{ border: "none", background: "none", color: "#ef4444", fontSize: "12px", cursor: "pointer" }}>- ล้างทั้งหมด</button>
          </div>

          <div style={{ minHeight: "200px", maxHeight: "350px", overflowY: "auto", margin: "10px 0" }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", color: "#94a3b8", marginTop: "60px", fontSize: "13px" }}>แตะเมนูเพื่อเพิ่มรายการ</div>
            ) : (
              <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ color: "#64748b", borderBottom: "1px solid #f1f5f9", textAlign: "left" }}>
                    <th style={{ paddingBottom: "6px" }}>#</th>
                    <th style={{ paddingBottom: "6px" }}>รายการอาหาร</th>
                    <th style={{ paddingBottom: "6px", textAlign: "center" }}>QTY</th>
                    <th style={{ paddingBottom: "6px", textAlign: "right" }}>ราคา</th>
                    <th style={{ paddingBottom: "6px", textAlign: "right" }}>รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                      <td style={{ padding: "8px 0", color: "#64748b" }}>{index + 1}.</td>
                      <td style={{ padding: "8px 0", fontWeight: "500" }}>{item.name}</td>
                      <td style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                          <button onClick={() => changeQty(item.id, -1)} style={{ width: "18px", height: "18px", border: "1px solid #cbd5e1", borderRadius: "3px", background: "white", cursor: "pointer", fontSize: "10px" }}>-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)} style={{ width: "18px", height: "18px", border: "1px solid #cbd5e1", borderRadius: "3px", background: "white", cursor: "pointer", fontSize: "10px" }}>+</button>
                        </div>
                      </td>
                      <td style={{ textAlign: "right", color: "#64748b" }}>{(item.price).toFixed(2)}</td>
                      <td style={{ textAlign: "right", fontWeight: "bold" }}>{THB(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* ยอดสรุปเงิน */}
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "10px", fontSize: "13px", display: "grid", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>ยอดรวม (Subtotal)</span>
              <span style={{ fontWeight: "bold" }}>{THB(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748b" }}>ส่วนลด (Discount)</span>
              <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} style={{ width: "60px", textAlign: "right", border: "1px solid #cbd5e1", borderRadius: "3px", padding: "2px 4px" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", color: "#64748b" }}>
                <input type="checkbox" checked={vatOn} onChange={(e) => setVatOn(e.target.checked)} />
                ภาษี (VAT 7%)
              </label>
              <span>{THB(vatAmount)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "15px", borderTop: "1px solid #f1f5f9", paddingTop: "8px" }}>
              <span>ยอดสุทธิ</span>
              <span>{THB(total)}</span>
            </div>
          </div>

          {/* ปุ่มชำระเงินสีเขียว & ปุ่มพักบิลสีเหลือง */}
          <div style={{ display: "grid", gap: "8px", marginTop: "14px" }}>
            <button onClick={() => cart.length > 0 && setShowPay(true)} disabled={cart.length === 0} style={{ backgroundColor: "#16a34a", color: "white", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>
              ชำระเงิน
            </button>
            <button onClick={holdBill} disabled={cart.length === 0} style={{ backgroundColor: "#eab308", color: "white", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>
              พักบิล
            </button>
          </div>
        </div>
      </div>

      {/* Pop-up ชำระเงิน */}
      {showPay && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", width: "300px", position: "relative" }}>
            <button onClick={() => setShowPay(false)} style={{ position: "absolute", top: "12px", right: "12px", border: "none", background: "none", cursor: "pointer" }}><X size={16} /></button>
            <h3 style={{ marginTop: 0, fontSize: "16px" }}>ชำระเงิน</h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span>ยอดสุทธิ</span>
              <strong style={{ color: "#16a34a" }}>{THB(total)}</strong>
            </div>
            <label style={{ fontSize: "12px", color: "#64748b" }}>รับเงินสด</label>
            <input type="number" value={cashReceived} onChange={(e) => setCashReceived(e.target.value)} placeholder="0.00" style={{ width: "100%", padding: "8px", margin: "4px 0 12px 0", boxSizing: "border-box", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
            {change !== null && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "#16a34a" }}>
                <span>เงินทอน</span>
                <strong>{THB(change)}</strong>
              </div>
            )}
            <button onClick={completePayment} style={{ width: "100%", backgroundColor: "#16a34a", color: "white", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
              ยืนยันชำระเงิน
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#1e293b", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "13px" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <>
      <div style={{ padding: "10px", backgroundColor: "white", borderBottom: "1px solid #e2e8f0", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button type="button" className="btn btn-primary">Primary</button>
        <button type="button" className="btn btn-secondary">Secondary</button>
        <button type="button" className="btn btn-success">Success</button>
        <button type="button" className="btn btn-danger">Danger</button>
        <button type="button" className="btn btn-warning">Warning</button>
        <button type="button" className="btn btn-info">Info</button>
        <button type="button" className="btn btn-light">Light</button>
        <button type="button" className="btn btn-dark">Dark</button>
        <button type="button" className="btn btn-link">Link</button>
      </div>

      <POSApp />
    </>
  );
}