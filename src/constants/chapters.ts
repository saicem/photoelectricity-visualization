export const CHAPTERS = [
  { key: 'PHYSICS_BASICS', path: '/learn/physics-basics', title: '基础物理定义', part: 'Part 1 · 基础篇' },
  { key: 'LIGHT_BASICS',   path: '/learn/light-basics',   title: '光波基础',       part: 'Part 1 · 基础篇' },
  { key: 'LASER',          path: '/learn/laser',           title: '激光器',         part: 'Part 2 · 光源篇' },
  { key: 'INTERFERENCE',   path: '/learn/interference',    title: '干涉原理',       part: 'Part 3 · 调制器篇' },
  { key: 'MZ_MODULATOR',   path: '/learn/mz-modulator',    title: 'MZ 调制器',      part: 'Part 3 · 调制器篇' },
  { key: 'IQ_MODULATOR',   path: '/learn/iq-modulator',    title: 'IQ 调制器',      part: 'Part 3 · 调制器篇' },
  { key: 'POLARIZATION',   path: '/learn/polarization',    title: '偏振复用',       part: 'Part 3 · 调制器篇' },
  { key: 'DUAL_POLARIZATION', path: '/learn/dual-polarization', title: '高级调制',  part: 'Part 3 · 调制器篇' },
  { key: 'RECEIVER',       path: '/learn/receiver',        title: '光接收器',       part: 'Part 4 · 接收篇' },
  { key: 'GLOSSARY',       path: '/learn/glossary',        title: '术语表',         part: '附录' },
] as const

export const TOTAL_CHAPTERS = CHAPTERS.length
