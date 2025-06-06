function AlertModal({ mensagem, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-10 w-80 text-start shadow-lg">
                <div className="flex justify-center">
                    <h2 className="text-xl font-bold mb-4">AVISO!</h2>
                </div>
                <p className="mb-6 text-lg">{mensagem}</p>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlertModal;
