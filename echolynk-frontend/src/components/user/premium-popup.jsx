import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog';
import { useNavigate } from 'react-router-dom';
import  chat  from '../../assets/chat.png';
import cues from '../../assets/cues.png'
import upgrade from '../../assets/upgrade.png'

function PremiumCarouselPopup({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: 'Enhanced Suggestions',
      description: 'Get smart, AI-driven suggestions for user responses to improve communication efficiency.',
      image: chat,
      details: 'With AI-driven suggestions, the app can help you craft precise and effective responses, saving time and enhancing communication clarity.'
    },
    {
      title: 'Visual Cues',
      description: 'Unlock visual aids for complex or hard-to-understand words, making conversations easier to follow.',
      image: cues,
      details: 'Visual cues like images and icons will accompany text, helping you understand difficult words or phrases instantly.'
    },
    {
      title: 'Upgrade Now',
      description: 'Ready to take your experience to the next level? Upgrade now to access all these features and more!',
      image: upgrade,
      details: 'By upgrading, you gain exclusive access to all premium features, ensuring the best possible user experience.',
      isLastSlide: true
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
            <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="mb-4 mx-auto w-40 h-40" />
            <p>{slides[currentSlide].description}</p>
            <p className="mt-2 text-sm text-gray-600">{slides[currentSlide].details}</p>
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
