import React from 'react'
import styled from 'styled-components'

interface DetailsProps {
  name: string
}

interface PokeDetailsResponse {
  name: string
  id: number
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Name = styled.h2`
  text-transform: capitalize;
`

const ButtonContainer = styled.div`
  align-self: flex-end;
`

export const Details: React.FunctionComponent<DetailsProps> = ({ name }) => {
  const [data, setData] = React.useState<PokeDetailsResponse | null>(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!data || data.name !== name) {
      setError(null)
      try {
        async function fetchData(): Promise<void> {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          )
          const json = await response.json()
          setData(json as PokeDetailsResponse)
        }
        fetchData()
      } catch (e) {
        setError(e)
      }
    }
  }, [data, name])

  React.useEffect(() => {
    if (data) {
      window.renderPokedexCatchBtn('catchBtnContainer', data.name)
      return () => {
        window.unmountPokedexCatchBtn('catchBtnContainer')
      }
    }
  }, [data])

  if (!data) return <p>Loading...</p>
  if (error) return <p>{error.message || 'unknown error'}</p>

  return (
    <Wrapper>
      <img src={data.sprites.other.dream_world.front_default} />
      <Name>{data.name}</Name>
      <ButtonContainer id="catchBtnContainer" />
    </Wrapper>
  )
}
