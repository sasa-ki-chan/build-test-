import { miniJSX } from 'miniJSX/core'
// import { For } from 'miniJSX/utils'

type JSXOutout = JSX.Element

const For = () => {
  const test = <div></div>
  return test as JSXOutout;
}

const test = 
  <div class="now">
    <For each={5}>
      nownow{For}
    </For>
  </div>