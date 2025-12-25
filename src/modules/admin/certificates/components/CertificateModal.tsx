import { motion, AnimatePresence } from "framer-motion";
import { CertificateForm } from "./CertificateForm";
import type { CertificateModalProps } from "../../../../types/ui/CertificateModalProps"; // Ajusta ruta

// Extendemos interfaz
interface ExtendedCertificateModalProps extends CertificateModalProps {
  onUploadFile?: (file: File) => void;
  isUploadingFile?: boolean;
}

export const CertificateModal = ({
  isOpen,
  initialData,
  isLoading,
  onSubmit,
  onClose,
  onUploadFile, // <--- Nueva prop
  isUploadingFile, // <--- Nueva prop
}: ExtendedCertificateModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          {/* Formulario Container */}
          <div className="relative z-10 w-full max-w-lg">
            <CertificateForm
              initialData={initialData}
              isLoading={isLoading}
              onSubmit={onSubmit}
              onCancel={onClose}
              onUploadFile={onUploadFile}
              isUploadingFile={isUploadingFile}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
