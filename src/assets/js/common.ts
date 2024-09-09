
import line from './_common/line.ts';
import setUnderLine from './_common/underline.ts';
import scroll from './_common/scroll.ts';
import responsive from './_common/responsive.ts';
import { appendTest } from './_components/test.ts';
addEventListener('DOMContentLoaded', () => {
  line();
  setUnderLine();
  scroll();
  responsive();
  document.appendChild(appendTest())
});
