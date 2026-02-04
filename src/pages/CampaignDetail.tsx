import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StatCard } from "@/components/StatCard";
import axios from "axios";

import type { Campaign, CampaignStatus } from "@/types/campaigns";
import {
  ArrowLeft,
  MousePointer,
  Eye,
  DollarSign,
  Percent,
  Play,
  Pause,
} from "lucide-react";
import { toast } from "sonner";

const statusLabels: Record<string, string> = {
  active: "Actif",
  paused: "En pause",
  finished: "Terminé",
};
const statusVariants: Record<string, string> = {
  active: "badge-primary",
  paused: "badge-secondary",
  finished: "badge-outline",
};

const api = axios.create({
  baseURL: "http://localhost:5001/campaigns",
  headers: {
    "Content-Type": "application/json",
  },
});

export function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [stats, setStats] = useState<{
    impressions: number;
    clicks: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const resCampaign = await api.get(`/${id}`);
        setCampaign(resCampaign.data);
        const resStats = await api.get(`/${id}/stats`);
        setStats(resStats.data);
      } catch (err: any) {
        console.error(err);
        toast.error(
          err.response?.data?.message || "Impossible de charger la campagne",
        );
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id, navigate]);

  if (loading)
    return <div className="container mx-auto px-4 py-8">Chargement...</div>;
  if (!campaign)
    return (
      <div className="container mx-auto px-4 py-8">Campagne non trouvée</div>
    );

  const ctr =
    stats && stats.impressions > 0
      ? ((stats.clicks / stats.impressions) * 100).toFixed(2)
      : "0.00";

  const cpc =
    stats && stats.clicks > 0
      ? (campaign.budget / stats.clicks).toFixed(2)
      : "0.00";

  const toggleStatus = async () => {
    if (campaign.status === "finished") {
      toast.error("Impossible de modifier une campagne terminée");
      return;
    }

    const newStatus: CampaignStatus =
      campaign.status === "active" ? "paused" : "active";

    try {
      await api.patch(`/${id}/status`, { status: newStatus });
      setCampaign({ ...campaign, status: newStatus });
      toast.success(
        `Campagne ${newStatus === "active" ? "activée" : "mise en pause"}`,
      );
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Erreur lors de la mise à jour",
      );
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        type="button"
        className="mb-6 gap-2 btn btn-ghost"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux campagnes
      </button>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-3xl font-bold text-base-content">
              {campaign.name}
            </h1>
            <span className={`badge ${statusVariants[campaign.status]}`}>
              {statusLabels[campaign.status]}
            </span>
          </div>
          <p className="text-base-content/70">{campaign.advertiser}</p>
        </div>

        {campaign.status !== "finished" && (
          <button
            type="button"
            onClick={toggleStatus}
            className="btn btn-secondary gap-2"
          >
            {campaign.status === "active" ? (
              <>
                <Pause className="h-4 w-4" />
                Mettre en pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Activer
              </>
            )}
          </button>
        )}
      </div>

      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Impressions"
            value={stats.impressions.toLocaleString("fr-FR")}
            icon={Eye}
          />
          <StatCard
            title="Clics"
            value={stats.clicks.toLocaleString("fr-FR")}
            icon={MousePointer}
          />
          <StatCard
            title="CTR"
            value={`${ctr}%`}
            icon={Percent}
            description="Taux de clics"
          />
          <StatCard
            title="CPC"
            value={`${cpc} €`}
            icon={DollarSign}
            description="Coût par clic"
          />
        </div>
      )}

      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-base-content">
            Détails de la campagne
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-base-content/70">Budget total</dt>
              <dd className="font-semibold text-base-content">
                {campaign.budget.toLocaleString("fr-FR")} €
              </dd>
            </div>
            <div>
              <dt className="text-sm text-base-content/70">Annonceur</dt>
              <dd className="font-semibold text-base-content">
                {campaign.advertiser}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-base-content/70">Date de début</dt>
              <dd className="font-semibold text-base-content">
                {formatDate(campaign.startDate)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-base-content/70">Date de fin</dt>
              <dd className="font-semibold text-base-content">
                {formatDate(campaign.endDate)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
