import line from './_common/line.ts';
import setUnderLine from './_common/underline.ts';
import scroll from './_common/scroll.ts';
<<<<<<< Updated upstream
import responsive from './_common/responsive.tsx';
import {appendTest} from './_components/test.tsx';

=======
import responsive from './_common/responsive.ts';
// import { appendTest } from './_components/test.ts';
>>>>>>> Stashed changes
addEventListener('DOMContentLoaded', () => {
  line();
  setUnderLine();
  scroll();
  responsive();
<<<<<<< Updated upstream
  // appendTest();
=======
  // document.appendChild(appendTest())
>>>>>>> Stashed changes
});
