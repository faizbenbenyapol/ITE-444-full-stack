import db from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/products
export async function GET() {
  try {
    const [products] = await db.query("SELECT * FROM products");
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/products
export async function POST(request) {
  try {
    const { name, price, stock, img_url, description } = await request.json();

    await db.query(
      `INSERT INTO products (name, price, stock, img_url, description) VALUES (?, ?, ?, ?, ?)`,
      [name, price, stock, img_url, description]
    );

    return NextResponse.json({ message: "Product created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}