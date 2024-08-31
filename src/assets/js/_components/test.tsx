import { miniJSX } from 'miniJSX/core'

export const Test = () => {
    const test =
        <div class="testing">
            <div class="test">
              <h2>dijidfomo</h2>
            </div>
          <h1>Test</h1>
        </div>
    return test;
}

export const appendTest = () => {
  document.body.appendChild(Test())
}