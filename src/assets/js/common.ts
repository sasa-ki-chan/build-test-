import line from './_common/line.ts';
import setUnderLine from './_common/underline.ts';
import scroll from './_common/scroll.ts';
import responsive from './_common/responsive.tsx';
import {appendTest} from './_components/test.tsx';

addEventListener('DOMContentLoaded', () => {
  line();
  setUnderLine();
  scroll();
  responsive();
  appendTest();
});
