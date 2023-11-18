
import Dep from '../observer/dep'

declare const RefSymbol: unique symbol
export const RefFlag = `__v_isRef`

export interface Ref<T = any> {
  value: any,
  /**
  * Type differentiator only.
  * We need this to be in public d.ts but don't want it to show up in IDE
  * autocomplete, so we use a private Symbol instead.
  */
 [RefSymbol]: true
 /**
  * @internal
  */
 dep?: Dep
 /**
  * @internal
  */
 [RefFlag]: true

}