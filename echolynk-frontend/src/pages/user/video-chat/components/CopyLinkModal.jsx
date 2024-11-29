import { useState } from "react";

const CopyLinkModal = ({ link }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCopied, setCopied] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleModal}
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      >
        <svg
          className="w-4 h-4 me-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.5 3A3.5 3.5 0 0 0 14 7L8.1 9.8A3.5 3.5 0 0 0 2 12a3.5 3.5 0 0 0 6.1 2.3l6 2.7-.1.5a3.5 3.5 0 1 0 1-2.3l-6-2.7a3.5 3.5 0 0 0 0-1L15 9a3.5 3.5 0 0 0 6-2.4c0-2-1.6-3.5-3.5-3.5Z" />
        </svg>
        Copy
      </button>

      {isModalVisible && (
        <div className="fixed z-50 flex items-center justify-center left-5 bottom-5 ">
          <div className="relative w-full max-w-lg p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-start justify-between p-4">
              <h3 className="text-lg font-medium text-black dark:text-gray-400">
                Share Meeting Link
              </h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 m-2 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="px-4 pb-4">
              <label
                htmlFor="link"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Share this link with others to join the room:
              </label>
              <div className="relative">
                <input
                  id="link"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                  value={link}
                  readOnly
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute p-2 text-gray-500 transform -translate-y-1/2 bg-gray-100 rounded-lg top-1/2 right-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  {isCopied ? (
                    <svg
                      className="w-5 h-5 text-blue-700 dark:text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                  )}
                </button>
              </div>
              {isCopied && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                  Link copied to clipboard!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CopyLinkModal;
