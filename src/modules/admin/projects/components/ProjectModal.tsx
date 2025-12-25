import { motion, AnimatePresence } from "framer-motion";
import { ProjectForm } from "./ProjectForm";
import type { ProjectModalProps } from "../../../../types/ui/ProjectUI";

interface ExtendedProjectModalProps extends ProjectModalProps {
  onUploadCover?: (file: File) => void;
  isUploadingCover?: boolean;
}

export const ProjectModal = ({
  isOpen,
  initialData,
  isLoading,
  onSubmit,
  onClose,
  onUploadCover,
  isUploadingCover,
}: ExtendedProjectModalProps) => {
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
          {/* Max-width mayor para proyectos */}
          <div className="relative z-10 w-full max-w-3xl">
            <ProjectForm
              initialData={initialData}
              isLoading={isLoading}
              onSubmit={onSubmit}
              onCancel={onClose}
              onUploadCover={onUploadCover}
              isUploadingCover={isUploadingCover}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
