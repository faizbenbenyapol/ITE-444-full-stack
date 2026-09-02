"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import NavbarAdmin from "@/app/admin/navbar";
import BootstrapClient from "@/components/BootstrapClient";

export default function EditProduct({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    img_url: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || "",
            price: data.price || "",
            stock: data.stock || "",
            img_url: data.img_url || "",
            description: data.description || "",
          });
        } else {
          Swal.fire("ข้อผิดพลาด!", "ไม่พบข้อมูลสินค้านี้", "error");
          router.push("/admin/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, router]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          title: "สำเร็จ!",
          text: "แก้ไขข้อมูลสินค้าเรียบร้อยแล้ว",
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
          text: "ไม่สามารถแก้ไขข้อมูลสินค้าได้",
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

  if (loading) {
    return (
      <>
        <NavbarAdmin />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">แก้ไขสินค้า (ID: {id})</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ชื่อสินค้า</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.price}
              onChange={handleChange}
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
              value={formData.stock}
              onChange={handleChange}
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
              value={formData.img_url}
              onChange={handleChange}
              placeholder="กรอก URL รูปภาพ"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">รายละเอียด</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="กรอกรายละเอียดสินค้า"
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-warning me-2">
            บันทึกการแก้ไข
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.push("/admin/products")}
          >
            ยกเลิก
          </button>
        </form>
      </div>
    </>
  );
}
