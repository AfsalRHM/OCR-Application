export type SaveRecordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { recordName: string; password: string }) => void;
  type: string;
};
