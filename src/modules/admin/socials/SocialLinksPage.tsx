import { useState } from "react";
import { toast } from "sonner";
import {
  Share2,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  Link as LinkIcon,
} from "lucide-react";
import { useSocialLinks } from "../../../hooks/useSocialLink";
import type {
  SocialLinkDto,
  SocialLinkCreateRequest,
} from "../../../types/models/socialLink";
import { SocialLinkModal } from "./components/SocialLinkModal";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";

// Helper para iconos dinámicos
const getIcon = (platformName: string) => {
  const lower = platformName.toLowerCase();
  if (lower.includes("github")) return <Github />;
  if (lower.includes("linkedin")) return <Linkedin />;
  if (lower.includes("twitter") || lower.includes("x")) return <Twitter />;
  if (lower.includes("facebook")) return <Facebook />;
  if (lower.includes("instagram")) return <Instagram />;
  if (lower.includes("youtube")) return <Youtube />;
  if (lower.includes("web") || lower.includes("site")) return <Globe />;
  return <LinkIcon />;
};

export default function SocialLinksPage() {
  const {
    socialLinks,
    isLoading,
    isError,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
    isCreating,
    isUpdating,
  } = useSocialLinks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialLinkDto | null>(null);

  // --- HANDLERS ---
  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: SocialLinkDto) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Eliminar este enlace?")) {
      try {
        await deleteSocialLink(id);
        toast.success("Enlace eliminado");
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  const handleSubmitForm = async (data: SocialLinkCreateRequest) => {
    const promise = editingItem
      ? updateSocialLink({ ...data, id: editingItem.id })
      : createSocialLink(data);

    toast.promise(promise, {
      loading: editingItem ? "Actualizando..." : "Creando...",
      success: () => {
        handleClose();
        return editingItem ? "Enlace actualizado" : "Enlace creado";
      },
      error: "Error al guardar",
    });
  };

  const isFormLoading = isCreating || isUpdating;

  // --- RENDER ---
  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center text-cyan-500">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  if (isError)
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex gap-3">
        <AlertCircle /> Error al cargar redes sociales.
      </div>
    );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-maven text-white flex items-center gap-3">
            <Share2 className="text-cyan-400" size={32} />
            Redes Sociales
          </h1>
          <p className="text-gray-400 mt-1">Conecta con tu audiencia.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-all hover:scale-105 active:scale-95 font-medium shadow-lg backdrop-blur-md"
        >
          <Plus size={20} /> Nuevo Enlace
        </button>
      </div>

      {/* LISTA */}
      {socialLinks.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
          <Share2 size={48} className="mx-auto text-gray-600 mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-gray-300">Sin enlaces</h3>
          <p className="text-gray-500 mt-2">
            Agrega LinkedIn, GitHub o tu sitio web.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...socialLinks]
            .sort((a, b) => a.sortOrder - b.sortOrder) // Ordenar por sortOrder
            .map((link) => (
              <GlassTiltCard
                key={link.id}
                className="p-5 border-white/10 bg-black/40 group relative overflow-hidden flex items-center justify-between hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Icono Dinámico */}
                  <div className="p-3 bg-white/5 rounded-xl text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-colors shadow-inner">
                    {getIcon(link.platform)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">
                      {link.platform}
                    </h3>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-cyan-400 truncate block transition-colors"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                  <button
                    onClick={() => handleOpenEdit(link)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Indicador de Orden (Discreto) */}
                <div className="absolute top-2 right-2 text-[10px] text-gray-600 font-mono opacity-50">
                  #{link.sortOrder}
                </div>
              </GlassTiltCard>
            ))}
        </div>
      )}

      {/* MODAL */}
      <SocialLinkModal
        isOpen={isModalOpen}
        initialData={editingItem}
        isLoading={isFormLoading}
        onSubmit={handleSubmitForm}
        onClose={handleClose}
      />
    </div>
  );
}
