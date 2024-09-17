import type { Meta } from './types.d.ts';

const meta: Meta  = {
  title: '佐々木のホームページ',
  description: '佐々木のホームページです。',
  keywords: '佐々木,ホームページ',
  init: (options) => {
    meta.title = options.title ? options.title + ' | ' + meta.title : meta.title;
    meta.description = options.description || meta.description;
    meta.keywords = options.keywords || meta.keywords;
  }
}

export default meta;