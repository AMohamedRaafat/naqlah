'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import Step1PickupLocation from '@/components/request-move/step1-pickup-location';
import Step2PickupDetails from '@/components/request-move/step2-pickup-details';
import Step3DestinationLocation from '@/components/request-move/step3-destination-location';
import Step4DestinationDetails from '@/components/request-move/step4-destination-details';
import Step5FurnitureDetails from '@/components/request-move/step5-furniture-details';
import Step6AdditionalServices from '@/components/request-move/step6-additional-services';
import Step7DateTime from '@/components/request-move/step7-datetime';
import ReviewPage from '@/components/request-move/review-page';
import ProcessingPage from '@/components/request-move/processing-page';
import ProgressBar from '@/components/request-move/progress-bar';

export type OrderFormData = {
  // Step 1 & 3: Locations
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  destinationLocation: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };

  // Step 2: Pickup Details
  pickupDetails: {
    city: string;
    fullAddress: string;
    buildingName: string;
    floor: string;
    hasElevator: string;
    elevatorSize: string;
    additionalNotes: string;
  };

  // Step 4: Destination Details
  destinationDetails: {
    city: string;
    fullAddress: string;
    buildingName: string;
    floor: string;
    hasElevator: string;
    elevatorSize: string;
    additionalNotes: string;
  };

  // Step 5: Furniture Details
  furnitureDetails: {
    roomsCount: string;
    furniture: Array<{ name: string; quantity: number }>;
    photos: File[];
  };

  // Step 6: Additional Services
  additionalServices: {
    packaging: string;
    cleaningBefore: string;
    cleaningAfter: string;
    insurance: string;
    needDisassembly: string;
    disassemblyItems: string[];
    disassemblyNotes: string;
  };

  // Step 7: Date & Time
  dateTime: {
    date: Date | null;
    time: string;
    period: 'AM' | 'PM';
  };
};

export default function OrderMovePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const t = useTranslations();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OrderFormData>({
    pickupLocation: { lat: 24.7136, lng: 46.6753, address: '', city: '' },
    destinationLocation: { lat: 24.7136, lng: 46.6753, address: '', city: '' },
    pickupDetails: {
      city: '',
      fullAddress: '',
      buildingName: '',
      floor: '',
      hasElevator: '',
      elevatorSize: '',
      additionalNotes: '',
    },
    destinationDetails: {
      city: '',
      fullAddress: '',
      buildingName: '',
      floor: '',
      hasElevator: '',
      elevatorSize: '',
      additionalNotes: '',
    },
    furnitureDetails: {
      roomsCount: '',
      furniture: [],
      photos: [],
    },
    additionalServices: {
      packaging: '',
      cleaningBefore: '',
      cleaningAfter: '',
      insurance: '',
      needDisassembly: '',
      disassemblyItems: [],
      disassemblyNotes: '',
    },
    dateTime: {
      date: null,
      time: '11:30',
      period: 'AM',
    },
  });

  // Redirect if not logged in
  // if (!isLoggedIn) {
  //   router.push('/');
  //   return null;
  // }

  const totalSteps = 7;

  const handleNext = (stepData: Partial<OrderFormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Move to review page
      setCurrentStep(8);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = () => {
    console.log('Final Form Data:', formData);
    // Handle final submission (API call, etc.)
    // Move to processing page
    setCurrentStep(9);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PickupLocation
            data={formData.pickupLocation}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <Step2PickupDetails
            data={formData.pickupDetails}
            location={formData.pickupLocation}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3DestinationLocation
            data={formData.destinationLocation}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <Step4DestinationDetails
            data={formData.destinationDetails}
            location={formData.destinationLocation}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <Step5FurnitureDetails
            data={formData.furnitureDetails}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <Step6AdditionalServices
            data={formData.additionalServices}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 7:
        return <Step7DateTime data={formData.dateTime} onNext={handleNext} onBack={handleBack} />;
      case 8:
        return (
          <ReviewPage
            formData={formData}
            onEdit={handleEditStep}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      case 9:
        return <ProcessingPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-expo-arabic">
      {/* Breadcrumb and Progress Bar - Show for steps 1-7 and processing page */}
      {(currentStep <= totalSteps || currentStep === 9) && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto max-w-4xl px-4 py-4">
            {/* Breadcrumb */}
            <div className="mb-4 text-sm text-gray-600">
              <span>{t('navigation.home')}</span>
              <span className="mx-2">—</span>
              <span className="text-gray-900 font-medium">{t('navigation.requestMove')}</span>
              {currentStep === 9 && (
                <>
                  <span className="mx-2">—</span>
                  <span className="text-gray-900 font-medium">{t('orderMove.processing.breadcrumb') || 'معالجة الطلب'}</span>
                </>
              )}
            </div>

            {/* Progress Bar - Only show for steps 1-7 */}
            {currentStep <= totalSteps && (
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} onBack={handleBack} />
            )}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="container mx-auto max-w-4xl px-4 py-6">{renderStep()}</div>
    </div>
  );
}
