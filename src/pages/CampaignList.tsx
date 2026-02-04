import { useState, useEffect } from "react";
import type { Campaign } from "@/types/campaigns";
import { CampaignCard } from "@/components/CampaignCard";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "http://localhost:5001/campaigns",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get("/");
        setCampaigns(response.data);
      } catch (err: any) {
        console.error(err);
        toast.error(
          err.response?.data?.message || "Impossible de charger les campagnes",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(search.toLowerCase()) ||
      campaign.advertiser.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Chargement des campagnes...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">Campagnes</h1>
        <p className="text-base-content/70">
          Gérez vos campagnes publicitaires
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="join flex-1 w-full">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered join-item w-full"
            placeholder="Rechercher une campagne ou un annonceur…"
          />
        </div>
        <select
          className="select select-bordered w-full sm:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="paused">En pause</option>
          <option value="finished">Terminé</option>
        </select>
        <Link to="/campaigns/new">
          <button type="button" className="btn btn-primary gap-1">
            <Plus className="h-4 w-4" />
            Nouvelle
          </button>
        </Link>
      </div>

      {filteredCampaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-box bg-base-100 border border-base-300">
          <p className="text-base-content/70">Aucune campagne trouvée</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <Link key={campaign._id} to={`/campaigns/${campaign._id}`}>
              <CampaignCard campaign={campaign} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
