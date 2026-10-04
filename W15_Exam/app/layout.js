import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/Navbar";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata = { title: "ITE-444 Exam" };

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Navbar />
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}
