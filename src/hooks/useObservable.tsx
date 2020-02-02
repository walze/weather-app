import { OperatorFunction, Observable, of } from 'rxjs';
import { useState } from 'react';
import { pair } from 'ramda';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export function pipeOf<T>(): (o: Observable<T>) => Observable<T>;
export function pipeOf<T, A>(op1: OperatorFunction<T, A>): (o: Observable<T>) => Observable<A>;
export function pipeOf<T, A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): (o: Observable<T>) => Observable<B>;
export function pipeOf<T, A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): (o: Observable<T>) => Observable<C>;
export function pipeOf<T, A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): (o: Observable<T>) => Observable<D>;
export function pipeOf<T, A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): (o: Observable<T>) => Observable<E>;
export function pipeOf<T, A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): (o: Observable<T>) => Observable<F>;
export function pipeOf<T, A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): (o: Observable<T>) => Observable<G>;
export function pipeOf<T, A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): (o: Observable<T>) => Observable<H>;
export function pipeOf<T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): (o: Observable<T>) => Observable<I>;
export function pipeOf<T, A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, (o: Observable<T>) => any>[]): (o: Observable<T>) => Observable<{}>;
export function pipeOf(...fns: OperatorFunction<any, any>[]) {
  return (o: any) => o.pipe(...(fns as []));
}

type TypeWithGeneric<T> = Observable<T>
type extractGeneric<Type> = Type extends TypeWithGeneric<infer X> ? X : never

export const useObservable = <T,>(obs: () => Observable<T>) => {
  const [state, setState] = useState<T>()

  const updater = () => {
    const subs = obs().subscribe(setState)

    return () => {
      subs.unsubscribe()
    }
  }

  return pair(state, updater)
}

export const makeUseObservable = <F extends OperatorFunction<any, any>>(f: F) =>
  (props?: extractGeneric<Parameters<F>[0]>) =>
    useObservable<extractGeneric<ReturnType<F>>>(() => f(of(props)))