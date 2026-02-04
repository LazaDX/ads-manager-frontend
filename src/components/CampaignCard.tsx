import { useNavigate } from "react-router-dom";
import type { Campaign } from "@/types/campaigns";

interface CampaignCardProps {
  campaign: Campaign;
}

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

export function CampaignCard({ campaign }: CampaignCardProps) {
  const navigate = useNavigate();

  const ctr =
    campaign.impressions > 0
      ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2)
      : "0.00";

  return (
    <div
      className="card w-full bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:border-primary/30 cursor-pointer transition-all duration-200"
      onClick={() => navigate(`/campaigns/${campaign.id}`)}
    >
      <div className="card-body p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="card-title text-lg text-base-content">{campaign.name}</h2>
          <span className={`badge shrink-0 ${statusVariants[campaign.status]}`}>
            {statusLabels[campaign.status]}
          </span>
        </div>
        <p className="text-sm text-base-content/70">{campaign.advertiser}</p>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="text-base-content/60">Budget</p>
            <p className="font-semibold text-base-content">
              {campaign.budget.toLocaleString("fr-FR")} €
            </p>
          </div>
          <div>
            <p className="text-base-content/60">CTR</p>
            <p className="font-semibold text-base-content">{ctr}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
