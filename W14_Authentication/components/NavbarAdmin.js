import Link from "next/link";
import { logout } from "@/app/logout/actions";
import { getSession } from "@/lib/auth";
export default async function NavbarAdmin() {
  const session = await getSession();
  return (
    <nav className="navbar navbar-expand-lg  bg-danger">
      <div className="container">
        <Link className="navbar-brand text-white" href="/admin">
          Hi: {session?.name}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link text-white" href="/admin">
              Home
            </Link>

            <Link className="nav-link text-white" href="/admin/products">
              สินค้า
            </Link>
            <li className="nav-item">
              <Link className="nav-link" href="/admin/students">
                ข้อมูลนักศึกษา
              </Link>
            </li>
<li className="nav-item">
              <Link className="nav-link" href="/admin/users">
                ข้อมูลผู้ใช้
              </Link>
              
            </li>
            <form action={logout}>
              <button
                type="submit"
                className="btn
btn-outline-light"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
