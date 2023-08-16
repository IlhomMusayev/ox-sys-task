import AppLayout from "Layouts/AppLayout";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <div className="page-container">
        <div className="page-content-wrapper">
          <div className="page-content">
            <AppLayout>
              <Outlet />
            </AppLayout>
          </div>
        </div>
      </div>
    </main>
  );
}
