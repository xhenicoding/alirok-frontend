import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`

export const Label = styled.div`
  position: relative;
  box-shadow: 0px 3px 6px #396cce42;
  border-radius: 10px;
  opacity: 1;
  display: block;
  width: 100%;
  min-width: 7rem;
`

export const Labels = styled.div<{ size?: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ size }) =>
    `repeat(${!size ? 1 : size > 3 ? 3 : size}, max-content)`};
  gap: 15px;
  position: absolute;
  z-index: 2;
`

export const Title = styled.span`
  position: relative;
  background-color: #fff;
  font: normal normal normal 1.2rem 'Montserrat', sans-serif;
  letter-spacing: 0;
  color: #373435;
  opacity: 1;
  top: -8px;
  left: 15px;
`

export const Input = styled.input`
  font: normal normal bold 1.4rem 'Montserrat', sans-serif;
  letter-spacing: 0;
  color: #373435;
  opacity: 1;
  padding: 0.9rem 1.4rem;
  outline: none;
  border: none;
  width: 100%;
  height: 45px;
  border-radius: 10px;
`

export const CompoundInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 'fit-content';
`

export const Selected = styled.div`
  display: grid;
  grid-template-columns: 15px 10px;
  align-items: center;
  justify-content: center;
  background: #e5eefe;
  border-radius: 10px;
  height: 45px;
  width: 45px;
  padding: 5px 10px 5px 10px;
  gap: 1px;

  p {
    font-weight: 700;
    font-size: 1.4rem;
  }
`

export const SelectWrapper = styled.div`
  max-width: 6.8rem;
`

export const Error = styled.p`
  color: rgb(253, 101, 110);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin-top: 1rem;
`
