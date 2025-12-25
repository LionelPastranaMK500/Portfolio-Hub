import { motion, AnimatePresence } from "framer-motion";
import { SocialLinkForm } from "./SocialLinkForm";
import type { SocialLinkModalProps } from "../../../../types/ui/SocialLinkUI";

export const SocialLinkModal = ({
  isOpen,
  initialData,
  isLoading,
  onSubmit,
  onClose,
}: SocialLinkModalProps) => {
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
          <div className="relative z-10 w-full max-w-md">
            <SocialLinkForm
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
