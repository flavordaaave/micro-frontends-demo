import React from 'react'
import styled from 'styled-components'

interface PokeListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokeListResponseItem[]
}

interface PokeListResponseItem {
  name: string
  url: string
}

const ListItem = styled.li`
  padding: 2px 0;
  text-transform: capitalize;
`

export const Home: React.FunctionComponent = () => {
  const [data, setData] = React.useState<PokeListResponse | null>(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!data) {
      setError(null)
      try {
        async function fetchData(): Promise<void> {
          const response = await fetch(
            'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
          )
          const json = await response.json()
          setData(json as PokeListResponse)
        }
        fetchData()
      } catch (e) {
        setError(e)
      }
    }
  }, [data])

  if (!data) return <p>Loading...</p>
  if (error) return <p>{error.message || 'unknown error'}</p>

  return (
    <ul>
      {data.results.map((p) => (
        <ListItem key={p.name}>
          <a href={`/details/${p.name}`}>{p.name}</a>
        </ListItem>
      ))}
    </ul>
  )
}
