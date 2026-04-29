import { motion, AnimatePresence } from 'framer-motion';
import ToastComponent from './Toast';
import { useToast as useToastHook } from '../../hooks/useToast';

export function ToastContainer() {
  const { toasts, removeToast } = useToastHook();

  return (
    <div className="fixed top-4 right-4 z-[1000] flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
              delay: index * 0.1
            }}
            className="pointer-events-auto"
          >
            <ToastComponent
              toast={toast}
              onRemove={removeToast}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

