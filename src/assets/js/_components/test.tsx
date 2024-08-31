import { miniJSX } from 'miniJSX/core'
import { For } from 'miniJSX/utils'

export const Test = () => {
    const test =
        <div class="testing">
          <For each={5}>
            <div class="test"></div>
          <h1>Test</h1>
          </For>
        </div>
    return test;
}
const Test2 = () => {
  const test = <div><Test></Test></div>
  return test;
}

export const appendTest = () => {
  document.body.appendChild(Test())
}