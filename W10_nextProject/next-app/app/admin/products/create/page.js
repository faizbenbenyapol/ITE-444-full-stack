"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import NavbarAdmin from "@/app/admin/navbar";
import BootstrapClient from "@/components/BootstrapClient";

export default function CreateProduct() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      img_url: formData.get("img_url"),
      description: formData.get("description"),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        Swal.fire({
          title: "สำเร็จ!",
          text: "เพิ่มข้อมูลสินค้าเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#198754",
        }).then(() => {
          router.push("/admin/products");
          router.refresh();
        });
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถเพิ่มข้อมูลสินค้าได้",
          icon: "error",
          confirmButtonText: "ลองใหม่",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "ข้อผิดพลาด!",
        text: "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์",
        icon: "error",
      });
    }
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">เพิ่มสินค้า</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ชื่อสินค้า</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="กรอกชื่อสินค้า"
              required
              minLength={3}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ราคา</label>
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="กรอกราคา"
              min="0"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">จำนวนสินค้า</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              placeholder="กรอกจำนวนสินค้า"
              min="0"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">URL รูปภาพ</label>
            <input
              type="text"
              className="form-control"
              name="img_url"
              placeholder="กรอก URL รูปภาพ"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">รายละเอียด</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="กรอกรายละเอียดสินค้า"
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            บันทึกสินค้า
          </button>
        </form>
      </div>
    </>
  );
}