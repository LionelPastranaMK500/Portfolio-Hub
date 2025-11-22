// src/pages/dashboard/socials/SocialLinkListPage.tsx
import { Link } from "react-router-dom";
import {
  useMySocialLinks,
  useDeleteSocialLink,
} from "../../../services/socialLinkService";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaLink,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";

// Helper para iconos dinámicos
const getIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes("github")) return <FaGithub className="h-6 w-6" />;
  if (p.includes("linkedin")) return <FaLinkedin className="h-6 w-6" />;
  if (p.includes("twitter") || p.includes("x"))
    return <FaTwitter className="h-6 w-6" />;
  if (p.includes("instagram")) return <FaInstagram className="h-6 w-6" />;
  if (p.includes("youtube")) return <FaYoutube className="h-6 w-6" />;
  return <FaLink className="h-6 w-6" />;
};

export default function SocialLinkListPage() {
  const { data: socialLinks, isLoading } = useMySocialLinks();
  const { mutate: deleteLink } = useDeleteSocialLink();

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar este enlace?")) {
      deleteLink(id, {
        onSuccess: () => toast.success("Enlace eliminado"),
        onError: (e) => toast.error(e.message),
      });
    }
  };

  if (isLoading)
    return (
      <div className="p-10 text-center">
        <FaSpinner className="animate-spin inline text-cyan-500 h-8 w-8" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-maven text-gray-800 dark:text-white">
            Redes Sociales
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Conecta con tu audiencia.
          </p>
        </div>
        <Link
          to="/dashboard/socials/new"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          <FaPlus /> Nuevo Enlace
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialLinks?.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg shrink-0">
                {getIcon(link.platform)}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {link.platform}
                </h3>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline truncate block"
                >
                  {link.url}
                </a>
              </div>
            </div>

            <div className="flex gap-2 shrink-0 ml-4">
              <Link
                to={`/dashboard/socials/edit/${link.id}`}
                className="p-2 text-gray-500 hover:text-cyan-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaEdit />
              </Link>
              <button
                onClick={() => handleDelete(link.id)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {socialLinks?.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            No tienes redes sociales configuradas.
          </div>
        )}
      </div>
    </div>
  );
}
