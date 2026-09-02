import Link from "next/link";

export default function NavbarAdmin() {
  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-danger">
      <div className="container">
        <Link className="navbar-brand" href="/">
          NextShop
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
            <Link className="nav-link" href="/admin">
              Admin
            </Link>
            <Link className="nav-link text-white" href="/admin/products">
              Products
            </Link>
           
          </div>
        </div>
      </div>
    </nav>
  );
}