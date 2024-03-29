import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy, useState } from "react";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import CreateCampaign from "./pages/CreateCampaign";
const ActiveCampaignsPage = lazy(()=>import("./pages/ActiveCampaignsPage"))
const EditUserPage = lazy(()=>import("./pages/EditUserPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ReportsPage = lazy(()=>import("./pages/ReportsPage"))
const ReportDetailsPage = lazy(()=>import("./pages/ReportDetailsPage"))
const DonationPage = lazy(() => import("./pages/DonationPage"));
const RequestsPage = lazy(() => import("./pages/RequestsPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const EditCampaign = lazy(()=> import("./pages/EditCampaign"))

const App = () => {
  const [sidebarState, setSidebarState] = useState(true);

  return (
    <BrowserRouter>
      <div className="grid min-h-screen bg-blue-50">
        <Sidebar sidebarState={sidebarState} />
        <main className="lg:ml-64 transition-all grid grid-row-minmax bg-blue-50 overflow-y-auto overflow-x-hidden">
          <NavBar
            sidebarState={sidebarState}
            setSidebarState={setSidebarState}
          />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/donations" element={<DonationPage />}></Route>
              <Route path="/requests" element={<RequestsPage />}></Route>
              <Route path="/users" element={<UsersPage />}></Route>
              <Route
                path="/campaigns"
                element={<ActiveCampaignsPage />}
              ></Route>
              <Route path="/reports" element={<ReportsPage />}></Route>
              <Route path="/report/:id" element={<ReportDetailsPage />}></Route>
              <Route path="/campaigns" element={<ActiveCampaignsPage />}></Route>
              <Route path="/edit/:id" element={<EditUserPage />}></Route>
              <Route path="/create" element={<CreateCampaign />}></Route>
              <Route path="/editCampaign/:id" element={<EditCampaign />}></Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
