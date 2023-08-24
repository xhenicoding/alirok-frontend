import styled from 'styled-components'

export const Container = styled.div`
  background: #f2f7ff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #396cce42;
  border-radius: 1rem;
  height: 4.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
`

export const StepButton = styled.button<{ currentStep: boolean }>`
  background: ${({ currentStep }) => (currentStep ? '#fff' : 'transparent')};
  border-radius: 10px;
  height: 100%;
  border: none;
  padding: 0 2rem;
  font: normal normal bold 14px/18px Montserrat;
  letter-spacing: 0px;
  color: #1e1e1e;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    padding: 0 1.5rem;
  }
`
