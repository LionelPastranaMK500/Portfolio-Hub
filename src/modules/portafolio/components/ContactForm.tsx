import { useForm } from "react-hook-form";
import { useSendContactMessage } from "../../../services/publicPortfolio.service";
import { toast } from "react-toastify";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import type { ContactRequest } from "../../../types/Contact";

interface ContactFormProps {
  portfolioSlug: string;
}

export function ContactForm({ portfolioSlug }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactRequest>();
  const { mutateAsync: sendMessage, isPending } = useSendContactMessage();

  const onSubmit = async (data: ContactRequest) => {
    try {
      await sendMessage({ slug: portfolioSlug, data });
      toast.success("¡Mensaje enviado con éxito!");
      reset();
    } catch (error: any) {
      toast.error(error.message || "No se pudo enviar el mensaje.");
    }
  };

  const inputClass =
    "w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors";

  return (
    <section className="max-w-2xl mx-auto mt-16 p-8 rounded-2xl bg-white/5 border border-gray-700/50 backdrop-blur-sm">
      <h2 className="text-3xl font-bold font-maven text-white mb-6 text-center">
        Contáctame
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre
            </label>
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              className={inputClass}
              placeholder="Tu nombre"
            />
            {errors.name && (
              <span className="text-red-400 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              {...register("email", {
                required: "El email es obligatorio",
                pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
              })}
              className={inputClass}
              placeholder="tucorreo@ejemplo.com"
            />
            {errors.email && (
              <span className="text-red-400 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mensaje
          </label>
          <textarea
            {...register("message", {
              required: "El mensaje no puede estar vacío",
            })}
            className={`${inputClass} h-32 resize-none`}
            placeholder="¿En qué puedo ayudarte?"
          />
          {errors.message && (
            <span className="text-red-400 text-xs">
              {errors.message.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaPaperPlane />
          )}
          {isPending ? "Enviando..." : "Enviar Mensaje"}
        </button>
      </form>
    </section>
  );
}
