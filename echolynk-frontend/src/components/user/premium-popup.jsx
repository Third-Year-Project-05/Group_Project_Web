import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog';
import { useNavigate } from 'react-router-dom';

function PremiumCarouselPopup({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: 'Feature 1',
      description: 'Get access to exclusive content with our premium subscription.',
    },
    {
      title: 'Feature 2',
      description: 'Enjoy an ad-free experience and uninterrupted browsing.',
    },
    {
      title: 'Feature 3',
      description: 'Unlock advanced analytics and insights on your usage.',
    },
    {
      title: 'Upgrade Now',
      description: 'Ready to take your experience to the next level? Upgrade now!',
      isLastSlide: true,
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleUpgrade = () => {
    onClose();
    navigate('/premium-upgrade');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{slides[currentSlide].title}</DialogTitle>

        </DialogHeader>
        <div className="relative">
          <div className="text-center">
            <p>{slides[currentSlide].description}</p>
          </div>

          <div className="mt-4 flex justify-between">
            {currentSlide > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Previous
              </button>
            )}
            {slides[currentSlide].isLastSlide ? (
              <button
                onClick={handleUpgrade}
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Upgrade to Premium
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PremiumCarouselPopup;
