
import React from 'react'
import { mergeMap, map } from 'rxjs/operators'

import { makeUseObservable, pipeOf } from '~hooks/useObservable'

import { get, getLocation } from './helpers'


getLocation()
  .subscribe(console.log)


const useTodo = makeUseObservable(pipeOf(
  mergeMap((id: number) => get<ITodo>('https://jsonplaceholder.typicode.com/todos/' + id)),
  map(({ data }) => data),
))


export const App = () => {
  const [id, setId] = React.useState(1)
  const [todo] = useTodo(id, [id])

  console.log('render')

  return (
    <div>
      <div className="todo">
        <code>TODO: {JSON.stringify(todo)}</code>
      </div>

      <button onClick={() => setId(id + 1)}>next</button>
    </div >
  )
}