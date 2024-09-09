import { miniJSX } from "omochi-dev/miniJSX/core.ts";

const Test = () =>{
    return (
        <div>
            <h1>test2</h1>
        </div>
    )
}

const test2 =
  <div><Test /></div>;
document.body.appendChild(Test());