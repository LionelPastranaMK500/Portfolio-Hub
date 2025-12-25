import { motion, AnimatePresence } from "framer-motion";
import { EducationForm } from "./EducationForm";
import type { EducationModalProps } from "../../../../types/ui/EducationUI";

export const EducationModal = ({
  isOpen,
  initialData,
  isLoading,
  onSubmit,
  onClose,
}: EducationModalProps) => {
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
            <EducationForm
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
