import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-success">
      <div className="container">
        <Link className="navbar-brand text-white" href="/">
          NextShop
        </Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link text-white" href="/">
            หน้าหลัก
          </Link>
          <Link className="nav-link text-white" href="/admin/products">
            จัดการสินค้า
          </Link>
        </div>
      </div>
    </nav>
  );
}
