import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { steps } from '../../config';
import { useEffect, useState } from 'react';
import { TRootState } from '../../@types/redux';
import { useSelector } from 'react-redux';

type PartnerStapperProps = {
  partnerStep: number;
};

export const PartnerStapper = ({ partnerStep }: PartnerStapperProps) => {
  const [currentPartnerStep, setCurrentPartnerStep] = useState(partnerStep);

  const newPartnerStep = useSelector(
    (state: TRootState) => state.newPartner.step
  );

  const { activeStep } = useSteps({
    index: newPartnerStep,
    count: steps.length,
  });

  useEffect(() => {
    setCurrentPartnerStep(partnerStep);
  }, [partnerStep]);

  return (
    <Stepper
      index={activeStep}
      colorScheme="green"
      width={'70%'}
      marginTop={'8%'}
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            {/* <StepTitle>{step.title}</StepTitle> */}
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};
