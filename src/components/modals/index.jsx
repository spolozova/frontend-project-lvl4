// @ts-check
import React, {} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import { closeModal } from '../../slices/modalSlicer.js';

const modalTypes = {
  addChannel: AddChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelModal,
};

const getModal = (type) => modalTypes[type];

const ModalComponent = () => {
  // @ts-ignore
  const { type, isOpened } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  if (!isOpened) {
    return null;
  }
  const CurrentModal = getModal(type);

  return (
    <Modal
      show={isOpened}
      onHide={() => dispatch(closeModal())}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <CurrentModal />
    </Modal>

  );
};

export default ModalComponent;
