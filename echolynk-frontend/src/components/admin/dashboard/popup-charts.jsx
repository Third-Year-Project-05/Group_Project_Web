import { XIcon } from "lucide-react";
import { createPortal } from "react-dom";


export function ChartPopup({isOpen, closePopup, component}) {
    if (!isOpen) return null;

    return (
        
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 overflow-y-scroll">
            <div className="bg-white rounded-lg h-auto w-3/6 p-12">

                <button  className="float-end relative left-5 bottom-5 text-gray-500 hover:text-gray-700"
                    onClick={closePopup}>
                    <XIcon className="h-6 w-6"/>
                </button>
           
                <div className="flex flex-col gap-4">
                    {component}
                </div>
            </div>
        </div>
    )
}