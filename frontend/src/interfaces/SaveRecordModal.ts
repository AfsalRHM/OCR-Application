export type SaveRecordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { recordName: string; password: string }) => Promise<boolean>;
  type: string;
};
