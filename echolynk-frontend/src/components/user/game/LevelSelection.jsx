import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This is important for accessibility

const LevelSelectionModal = ({ isOpen, onClose, onSelectLevel }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
        <h2 className="text-2xl font-bold mb-4">Choose a Level</h2>
        <div className="flex flex-col space-y-4">
            <button onClick={() => onSelectLevel('Easy')} className="bg-blue-500 text-white px-6 py-2 rounded-full">Easy</button>
            <button onClick={() => onSelectLevel('Medium')} className="bg-yellow-500 text-white px-6 py-2 rounded-full">Medium</button>
            <button onClick={() => onSelectLevel('Hard')} className="bg-red-500 text-white px-6 py-2 rounded-full">Hard</button>
        </div>
    </Modal>
);

export default LevelSelectionModal;