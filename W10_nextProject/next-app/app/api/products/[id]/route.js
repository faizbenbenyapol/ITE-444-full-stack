import db from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/products/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const [products] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (products.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(products[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { name, price, stock, img_url, description } = await request.json();

    const [result] = await db.query(
      `UPDATE products SET name = ?, price = ?, stock = ?, img_url = ?, description = ? WHERE id = ?`,
      [name, price, stock, img_url, description, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
