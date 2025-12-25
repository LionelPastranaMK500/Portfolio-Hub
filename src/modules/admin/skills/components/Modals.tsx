import { motion, AnimatePresence } from "framer-motion";
import { CategoryForm } from "./CategoryForm";
import { SkillForm } from "./SkillForm";
import type {
  CategoryModalProps,
  SkillModalProps,
} from "../../../../types/ui/SkillUI";

interface ExtendedSkillModalProps extends SkillModalProps {
  onUploadIcon?: (file: File) => void;
  isUploadingIcon?: boolean;
}

export const CategoryModal = ({ isOpen, ...props }: CategoryModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={props.onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <div className="relative z-10 w-full max-w-md">
          <CategoryForm {...props} onCancel={props.onClose} />
        </div>
      </div>
    )}
  </AnimatePresence>
);

export const SkillModal = ({
  isOpen,
  onUploadIcon,
  isUploadingIcon,
  ...props
}: ExtendedSkillModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={props.onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <div className="relative z-10 w-full max-w-md">
          <SkillForm
            {...props}
            onCancel={props.onClose}
            // Pasamos props de subida
            onUploadIcon={onUploadIcon}
            isUploadingIcon={isUploadingIcon}
          />
        </div>
      </div>
    )}
  </AnimatePresence>
);
