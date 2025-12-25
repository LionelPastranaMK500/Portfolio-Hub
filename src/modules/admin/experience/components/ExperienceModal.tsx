import { motion, AnimatePresence } from "framer-motion";
import { ExperienceForm } from "./ExperienceForm";
import type { ExperienceModalProps } from "../../../../types/ui/ExperienceUI";

export const ExperienceModal = ({
  isOpen,
  initialData,
  isLoading,
  onSubmit,
  onClose,
}: ExperienceModalProps) => {
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
          <div className="relative z-10 w-full max-w-2xl">
            <ExperienceForm
              initialData={initialData}
              isLoading={isLoading}
              onSubmit={onSubmit}
              onCancel={onClose}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
