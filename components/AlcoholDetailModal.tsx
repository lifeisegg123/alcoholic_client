import { Modal } from "antd";
import { useRouter } from "next/dist/client/router";

type AlcoholDetailModalProps = {
  title: string;
  onClose: () => void;
};

const AlcoholDetailModal = ({ title, onClose }: AlcoholDetailModalProps) => {
  return (
    <Modal afterClose={onClose} title={title} visible={true} footer={null}>
      Enter
    </Modal>
  );
};

export default AlcoholDetailModal;
