import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';
import { Modal, Button } from '@/shared/components';
import { useAppDispatch } from '@/shared/hooks';
import { deletePost } from '@/entities/post/model';

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string | null;
  postTitle?: string;
}

export function ConfirmDeleteDialog({ isOpen, onClose, postId, postTitle }: ConfirmDeleteDialogProps) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    if (!postId) return;
    dispatch(deletePost(postId));
    toast.success('Post deleted 🗑️');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center gap-3 text-center">
        <motion.div
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }}
          className="rounded-full bg-red-100 p-4 text-red-500"
        >
          <AlertTriangle className="h-8 w-8" />
        </motion.div>
        <h3 className="font-display text-lg font-bold text-gray-700">Delete this post?</h3>
        <p className="text-sm text-gray-500 font-body">
          {postTitle ? `"${postTitle}" ` : 'This post '}
          will be permanently removed. This action can't be undone.
        </p>
        <div className="mt-3 flex w-full gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
