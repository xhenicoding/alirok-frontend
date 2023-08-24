import * as S from './styles'

export type Step = {
  number: number
  label: string
}

export interface StepperProps {
  steps: Step[]
  currentStep: number
  changeStep?: (step: number) => void
}

const Stepper = ({ steps, currentStep, changeStep }: StepperProps) => {
  const handleChangeStep = (step: number) => {
    if (changeStep) changeStep(step)
  }

  return (
    <S.Container>
      {steps.map((step, index) => (
        <S.StepButton
          onClick={() => handleChangeStep(step.number)}
          key={index}
          currentStep={currentStep === step.number}
        >
          {step.label} {index < steps.length - 1 && '  >'}
        </S.StepButton>
      ))}
    </S.Container>
  )
}

export default Stepper
