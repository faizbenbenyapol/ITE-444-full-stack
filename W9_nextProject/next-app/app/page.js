import Navbar from "./components/navbar";
import BootstrapClient from "./components/BootstrapClient";

export default function Home() {
  return (
    <>
      <Navbar />
      <BootstrapClient />
      <div className="container mt-5">
        <h1>Hello, Next.js!</h1>
      </div>
    </>
  );
}