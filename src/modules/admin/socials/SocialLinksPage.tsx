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
  ExternalLink,
} from "lucide-react";
import { useSocialLinks } from "../../../hooks/useSocialLink";
import type {
  SocialLinkDto,
  SocialLinkCreateRequest,
} from "../../../types/models/socialLink";
import { SocialLinkModal } from "./components/SocialLinkModal";
import { GlassTiltCard } from "../../../components/ui/GlassTiltCard";

// Helper para iconos dinámicos con tamaños consistentes
const getIcon = (platformName: string) => {
  const lower = platformName.toLowerCase();
  const props = { size: 24, strokeWidth: 2 };

  if (lower.includes("github")) return <Github {...props} />;
  if (lower.includes("linkedin")) return <Linkedin {...props} />;
  if (lower.includes("twitter") || lower.includes("x"))
    return <Twitter {...props} />;
  if (lower.includes("facebook")) return <Facebook {...props} />;
  if (lower.includes("instagram")) return <Instagram {...props} />;
  if (lower.includes("youtube")) return <Youtube {...props} />;
  if (lower.includes("web") || lower.includes("site"))
    return <Globe {...props} />;
  return <LinkIcon {...props} />;
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

  const isFormLoading = isCreating || isUpdating;

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
    if (window.confirm("¿Eliminar este enlace de red social?")) {
      try {
        await deleteSocialLink(id);
        toast.success("Enlace eliminado correctamente");
      } catch (error) {
        toast.error("Error al eliminar el enlace");
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
      error: "Error al guardar el enlace",
    });
  };

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
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-maven text-white flex items-center gap-3">
            <Share2 className="text-cyan-400" size={32} />
            Redes Sociales
          </h1>
          <p className="text-gray-400 mt-1 italic">
            Conecta tu presencia digital en un solo lugar.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl transition-all hover:scale-105 active:scale-95 font-bold shadow-lg backdrop-blur-md group"
        >
          <Plus
            size={20}
            className="group-hover:text-cyan-400 transition-colors"
          />
          Nuevo Enlace
        </button>
      </div>

      {/* GRID DE REDES */}
      {socialLinks.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-white/5 border-dashed">
          <Share2 size={64} className="mx-auto text-gray-700 mb-4 opacity-30" />
          <h3 className="text-xl font-bold text-gray-400">Tu red está vacía</h3>
          <p className="text-gray-600 mt-2">
            Agrega LinkedIn o GitHub para que te encuentren.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...socialLinks]
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((link) => (
              <GlassTiltCard
                key={link.id}
                className="p-0 border-white/10 bg-black/40 group relative overflow-hidden transition-all hover:border-cyan-500/50"
              >
                {/* Indicador de Orden Superior */}
                <div className="absolute top-0 right-0 px-3 py-1 bg-white/5 rounded-bl-xl text-[10px] font-black text-gray-500 group-hover:text-cyan-400 transition-colors">
                  0{link.sortOrder}
                </div>

                <div className="p-6 flex flex-col gap-5">
                  {/* Icono y Título */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/10 text-cyan-400 group-hover:text-white group-hover:scale-110 group-hover:bg-cyan-500 transition-all duration-500 shadow-xl">
                      {getIcon(link.platform)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-black text-white uppercase tracking-tighter truncate">
                        {link.platform}
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                      </div>
                    </div>
                  </div>

                  {/* URL */}
                  <div className="bg-black/20 p-3 rounded-xl border border-white/5 flex items-center justify-between group/link">
                    <span className="text-xs text-gray-500 truncate mr-2 font-mono">
                      {link.url.replace(/^https?:\/\//, "")}
                    </span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors shrink-0"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Footer de la Card / Acciones */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEdit(link)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg text-cyan-400 text-[10px] font-black uppercase tracking-wider transition-all border border-cyan-500/20"
                      >
                        <Edit2 size={12} /> Editar
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-600 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/20"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
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
