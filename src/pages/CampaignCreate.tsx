import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/campaigns",
  headers: {
    "Content-Type": "application/json",
  },
});

export function CampaignCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    advertiser: "",
    budget: "",
    startDate: "",
    endDate: "",
    impressions: "",
    clicks: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      name,
      advertiser,
      budget,
      startDate,
      endDate,
      impressions,
      clicks,
    } = formData;

    if (!name || !advertiser || !budget || !impressions || !clicks) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (+budget < 0 || +impressions < 0 || +clicks < 0) {
      toast.error(
        "Les valeurs de budget, impressions et clicks doivent être positives",
      );
      return;
    }

    if (+clicks > +impressions) {
      toast.error("Le nombre de clics ne peut pas dépasser les impressions");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("La date de début doit être antérieure à la date de fin");
      return;
    }

    setLoading(true);

    try {
      await api.post("/", {
        name,
        advertiser,
        budget: +budget,
        startDate,
        endDate,
        impressions: +impressions,
        clicks: +clicks,
      });

      toast.success("Campagne créée avec succès !");
      navigate("/");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button
        type="button"
        className="mb-6 gap-2 btn btn-ghost"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </button>

      <div className="card bg-base-100 shadow-md border border-base-300 w-full max-w-lg">
        <div className="card-body">
          <h2 className="card-title text-base-content">Créer une campagne</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text font-medium">
                  Nom de la campagne *
                </span>
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Campagne été 2024"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label htmlFor="advertiser" className="label">
                <span className="label-text font-medium">Annonceur *</span>
              </label>
              <input
                id="advertiser"
                name="advertiser"
                value={formData.advertiser}
                onChange={handleChange}
                placeholder="Ex: Nike"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label htmlFor="budget" className="label">
                <span className="label-text font-medium">Budget (€) *</span>
              </label>
              <input
                id="budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Ex: 5000"
                className="input input-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label htmlFor="startDate" className="label">
                  <span className="label-text font-medium">Date de début</span>
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label htmlFor="endDate" className="label">
                  <span className="label-text font-medium">Date de fin</span>
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="budget" className="label">
                <span className="label-text font-medium">Impression *</span>
              </label>
              <input
                id="impressions"
                name="impressions"
                type="number"
                value={formData.impressions}
                onChange={handleChange}
                placeholder="Ex: 5000"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label htmlFor="budget" className="label">
                <span className="label-text font-medium">Clicks *</span>
              </label>
              <input
                id="clicks"
                name="clicks"
                type="number"
                value={formData.clicks}
                onChange={handleChange}
                placeholder="Ex: 5000"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn btn-primary flex-1">
                {loading ? "Création..." : "Créer la campagne"}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => navigate("/")}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
