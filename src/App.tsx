import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { CampaignCreate } from "./pages/CampaignCreate";
import { CampaignList } from "./pages/CampaignList";
import { CampaignDetail } from "./pages/CampaignDetail";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-base-200">
      <Header />
      <Routes>
        <Route path="/" element={<CampaignList />} />
        <Route path="/campaigns/new" element={<CampaignCreate />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
