
export interface ComputedRef <T = any> extends WritableComputedRef<T>{
  
}


export interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: any /* Watcher */
}