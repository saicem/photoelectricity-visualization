import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Lightbulb, CircuitBoard, Compass, BarChart3, Radio, Flame, BookText } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';

interface Term {
  term: string;
  english?: string;
  definition: string;
  detail?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  terms: Term[];
}

const glossaryData: Category[] = [
  {
    id: 'light-basics',
    name: '光波基础',
    icon: <Lightbulb className="w-5 h-5 text-laser-cyan" />,
    terms: [
      {
        term: '波长',
        english: 'Wavelength',
        definition: '光在一个振动周期内传播的距离，常用符号 λ (lambda) 表示，单位通常为纳米 (nm)。',
        detail: '在真空中，波长与频率的关系为 c = λ·f，其中 c 是光速 (≈3×10⁸ m/s)。光通信中常用的波段包括：O波段 (1260-1360 nm)、C波段 (1530-1565 nm)、L波段 (1565-1625 nm)。',
      },
      {
        term: '频率',
        english: 'Frequency',
        definition: '单位时间内光振动的次数，常用符号 f 表示，单位为赫兹 (Hz)。',
        detail: '可见光的频率范围约为 430-790 THz。光的频率决定了光子的能量 E = hf，其中 h 是普朗克常数。',
      },
      {
        term: '振幅',
        english: 'Amplitude',
        definition: '光波电场或磁场振动的最大位移量，常用符号 A 表示。',
        detail: '光的强度 (能流密度) 与振幅的平方成正比，即 I ∝ A²。在强度调制直接调制光的振幅。',
      },
      {
        term: '相位',
        english: 'Phase',
        definition: '描述波动在某一时刻所处的振动状态，常用符号 φ 表示，单位为弧度 (rad)。',
        detail: '相位是相对的概念，通常讨论的是两束光之间的相位差。相位调制是现代光通信的核心技术之一。',
      },
      {
        term: '干涉',
        english: 'Interference',
        definition: '两束或多束光在空间相遇时，在重叠区域内光强重新分布的现象。',
        detail: '当两束相干光同相时，光强增强 (相长干涉)；反相时，光强减弱甚至抵消 (相消干涉)。马赫-曾德尔干涉仪是光调制器的基础结构。',
      },
      {
        term: '衍射',
        english: 'Diffraction',
        definition: '光遇到障碍物或小孔时，偏离直线传播路径而绕到障碍物后面的现象。',
        detail: '衍射是波动的固有特性。光栅、阵列波导光栅 (AWG) 等器件都基于衍射原理工作。',
      },
      {
        term: '相干光',
        english: 'Coherent Light',
        definition: '频率相同、振动方向相同、相位差恒定的光。',
        detail: '激光器发出的光是相干光。相干性分为时间相干性 (线宽) 和空间相干性。相干光通信利用光的全部信息 (幅度、相位、偏振) 进行调制和检测，大幅提升频谱效率。',
      },
    ],
  },
  {
    id: 'modulators',
    name: '调制器类',
    icon: <CircuitBoard className="w-5 h-5 text-laser-purple" />,
    terms: [
      {
        term: 'MZ 调制器',
        english: 'Mach-Zehnder Modulator',
        definition: '基于马赫-曾德尔干涉结构的光调制器，通过改变两臂的相位差来实现强度调制。',
        detail: 'MZM 由输入光被分束器分成两束，分别通过两臂，每臂上有电极可加电压改变折射率，从而改变光相位，最后两束光合束产生干涉输出。通过控制电压使两臂相位差为 π 时，输出消光比最大。',
      },
      {
        term: 'IQ 调制器',
        english: 'IQ Modulator',
        definition: '由两个 MZ 调制器组成的正交调制器，可以同时调制光的同相 (I) 和正交 (Q) 分量。',
        detail: 'IQ 调制器可以实现复杂的调制格式如 QPSK、QAM 等。一个 IQ 调制器包含两个 MZM，分别调制 I 和 Q 路，然后通过 90° 相移将 Q 路，最后合束输出。',
      },
      {
        term: '双偏振 IQ 调制器',
        english: 'Dual-Polarization IQ Modulator',
        definition: '将两个 IQ 调制器分别调制两个正交偏振态，实现偏振复用的高级调制器。',
        detail: 'DP-IQ 调制器是现代 100G 及以上速率光通信系统的核心发射器件。它先将激光分为 X 和 Y 两个偏振态，分别用 IQ 调制器调制，最后偏振合束输出。容量是单偏振 IQ 调制器的两倍。',
      },
      {
        term: '电光效应',
        english: 'Electro-optic Effect',
        definition: '某些晶体材料的折射率随外加电场变化的物理效应。',
        detail: '电光效应分为普克尔效应 (线性电光效应，折射率变化与电场成正比) 和克尔效应 (二次电光效应，折射率变化与电场平方成正比)。铌酸锂 (LiNbO₃) 调制器主要利用普克尔效应。',
      },
      {
        term: '热光效应',
        english: 'Thermo-optic Effect',
        definition: '材料的折射率随温度变化的效应。',
        detail: '硅的热光系数约为 1.8×10⁻⁴ /°C。热光效应常用于热光调制器或热光开关，结构简单但速度较慢 (微秒量级)，远低于电光调制器 (皮秒量级)。',
      },
      {
        term: 'Vπ',
        english: 'Half-wave Voltage',
        definition: '使调制器产生 π 相位差所需的驱动电压，也称为半波电压。',
        detail: 'Vπ 是衡量调制器效率的重要参数，Vπ 越小，调制器越高效。对于 MZ 调制器，当驱动电压等于 Vπ 时，输出光强从最大变到最小 (或相反)。Vπ 与电极长度成反比，电极越长，Vπ 越小。',
      },
    ],
  },
  {
    id: 'polarization',
    name: '偏振类',
    icon: <Compass className="w-5 h-5 text-laser-red" />,
    terms: [
      {
        term: '偏振态',
        english: 'State of Polarization, SOP',
        definition: '描述光的电场矢量振动方向随时间变化的方式。',
        detail: '常见的偏振态有线偏振、圆偏振和椭圆偏振。线偏振的电场矢量在一条直线上振动；圆偏振的电场矢量端点做圆周运动；椭圆偏振是最一般的情况。',
      },
      {
        term: '斯托克斯矢量',
        english: 'Stokes Vector',
        definition: '由四个参数 (S₀, S₁, S₂, S₃) 组成的矢量，用于描述光的偏振态。',
        detail: 'S₀ 是总光强，S₁ 是 0° 和 90° 线偏振分量的光强差，S₂ 是 45° 和 135° 线偏振分量的光强差，S₃ 是右旋和左旋圆偏振分量的光强差。斯托克斯矢量可以通过功率测量得到。',
      },
      {
        term: '庞加莱球',
        english: 'Poincaré Sphere',
        definition: '偏振态的几何表示，将归一化的斯托克斯参数 (S₁, S₂, S₃) 作为三维坐标。',
        detail: '庞加莱球面上的每一个点对应一种完全偏振态。球面上两点之间的角距离对应偏振态之间的关系。两个对径点对应正交的偏振态。',
      },
      {
        term: '偏振复用',
        english: 'Polarization Division Multiplexing, PDM',
        definition: '利用光的两个正交偏振态作为独立信道传输数据，使传输容量翻倍的技术。',
        detail: '在发射端用偏振合束器 (PBC) 将两个偏振态合在一起，在接收端用偏振分束器 (PBS) 分开。配合数字信号处理 (DSP) 可以补偿传输中的偏振态变化。',
      },
      {
        term: '偏振度',
        english: 'Degree of Polarization, DOP',
        definition: '描述光的偏振程度的物理量。',
        detail: 'DOP = √(S₁² + S₂² + S₃²) / S₀。DOP = 1 表示完全偏振光；DOP = 0 表示自然光 (完全非偏振光)；0 < DOP < 1 表示部分偏振光。',
      },
    ],
  },
  {
    id: 'modulation-formats',
    name: '调制格式类',
    icon: <BarChart3 className="w-5 h-5 text-laser-green" />,
    terms: [
      {
        term: 'QPSK',
        english: 'Quadrature Phase Shift Keying',
        definition: '正交相移键控，一种四相位调制格式，每个符号携带 2 比特信息。',
        detail: 'QPSK 有四个相位状态，通常为 0°、90°、180°、270° (或 π/4、3π/4、5π/4、7π/4)。QPSK 具有较好的抗噪声性能，是相干光通信中常用的调制格式。',
      },
      {
        term: '16QAM',
        english: '16 Quadrature Amplitude Modulation',
        definition: '16 进制正交幅度调制，每个符号携带 4 比特信息。',
        detail: '16QAM 的星座图有 16 个点，排列成 4×4 的方阵。相比 QPSK，16QAM 的频谱效率更高，但对噪声和非线性更敏感。',
      },
      {
        term: '64QAM',
        english: '64 Quadrature Amplitude Modulation',
        definition: '64 进制正交幅度调制，每个符号携带 6 比特信息。',
        detail: '64QAM 的星座图有 64 个点，排列成 8×8 的方阵。64QAM 的频谱效率更高，但需要更高的信噪比才能保证相同的误码率。',
      },
      {
        term: '星座图',
        english: 'Constellation Diagram',
        definition: '用复平面上的点表示调制信号的幅度和相位的图形。',
        detail: '星座图的横轴是同相分量 (I)，纵轴是正交分量 (Q)。每个点代表一个符号。星座图可以直观地显示调制格式和信号质量。',
      },
      {
        term: '符号率',
        english: 'Symbol Rate / Baud Rate',
        definition: '单位时间内传输的符号数，单位为波特 (Baud)。',
        detail: '符号率 = 比特率 / 每符号比特数。例如，28 GBaud 的 QPSK 系统比特率为 56 Gbit/s。',
      },
      {
        term: '比特率',
        english: 'Bit Rate',
        definition: '单位时间内传输的比特数，单位为 bit/s (bps)。',
        detail: '比特率 = 符号率 × log₂(M)，其中 M 是调制阶数。对于偏振复用系统，还要乘以 2。',
      },
    ],
  },
  {
    id: 'receiver',
    name: '接收类',
    icon: <Radio className="w-5 h-5 text-amber-400" />,
    terms: [
      {
        term: 'SNR',
        english: 'Signal-to-Noise Ratio',
        definition: '信噪比，信号功率与噪声功率的比值，通常用分贝 (dB) 表示。',
        detail: 'SNR = 10·log₁₀(P_signal / P_noise) dB。信噪比越高，信号质量越好，误码率越低。',
      },
      {
        term: 'BER',
        english: 'Bit Error Rate',
        definition: '误码率，传输中出错的比特数与总传输比特数的比值。',
        detail: 'BER 是衡量通信系统性能的最终指标。常见的目标 BER 通常为 10⁻³ (前向纠错前) 或 10⁻¹² (前向纠错后)。',
      },
      {
        term: 'EVM',
        english: 'Error Vector Magnitude',
        definition: '误差矢量幅度，衡量实际接收符号与理想符号位置之间的偏差。',
        detail: 'EVM 通常用百分比或 dB 表示。EVM 越小，信号质量越好。EVM 综合反映了各种损伤对信号的影响。',
      },
      {
        term: '相干接收',
        english: 'Coherent Detection',
        definition: '利用本振光与信号光混频，检测信号的幅度和相位信息的接收方式。',
        detail: '相干接收可以检测光的全部信息 (幅度、相位、偏振)，配合数字信号处理 (DSP) 可以补偿色度色散、偏振模色散等传输损伤。',
      },
      {
        term: '光电二极管',
        english: 'Photodiode, PD',
        definition: '将光信号转换为电信号的器件。',
        detail: '光电二极管基于光电效应工作。常见的类型有 PIN 光电二极管和雪崩光电二极管 (APD)。APD 有内部增益，灵敏度更高。',
      },
      {
        term: 'AWGN',
        english: 'Additive White Gaussian Noise',
        definition: '加性高斯白噪声，一种理想的噪声模型。',
        detail: 'AWGN 的功率谱密度在整个频带内均匀分布 (白)，幅度服从高斯分布。光通信中，放大器的自发辐射噪声 (ASE) 近似为 AWGN。',
      },
    ],
  },
  {
    id: 'laser',
    name: '激光器类',
    icon: <Flame className="w-5 h-5 text-laser-orange" />,
    terms: [
      {
        term: '激光器',
        english: 'Laser',
        definition: '通过受激辐射产生光放大的器件，输出相干光。',
        detail: 'Laser 是 Light Amplification by Stimulated Emission of Radiation 的缩写。激光器由增益介质、泵浦源和谐振腔三部分组成。',
      },
      {
        term: '受激辐射',
        english: 'Stimulated Emission',
        definition: '处于激发态的原子在入射光子的作用下，跃迁到低能级并辐射出与入射光子完全相同的光子的过程。',
        detail: '受激辐射产生的光子与入射光子具有相同的频率、相位、偏振和传播方向。这是激光产生的基础。',
      },
      {
        term: '谐振腔',
        english: 'Resonant Cavity',
        definition: '由两个或多个反射镜组成的光学结构，用于提供光反馈。',
        detail: '谐振腔使光在两个反射镜之间来回反射，多次通过增益介质获得放大。只有满足谐振条件的波长才能在腔内振荡。谐振腔决定了激光的纵模和横模特性。',
      },
      {
        term: '线宽',
        english: 'Linewidth',
        definition: '激光器输出光谱的宽度，通常用 3 dB 带宽表示。',
        detail: '线宽反映了激光的单色性和时间相干性。线宽越窄，相干性越好。分布式反馈激光器 (DFB) 的线宽通常为 MHz 量级，外腔激光器 (ECL) 的线宽可窄至 kHz 量级。',
      },
    ],
  },
];

export default function LearnGlossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return glossaryData;

    const query = searchQuery.toLowerCase();
    return glossaryData
      .map((category) => ({
        ...category,
        terms: category.terms.filter(
          (term) =>
            term.term.toLowerCase().includes(query) ||
            (term.english && term.english.toLowerCase().includes(query)) ||
            term.definition.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.terms.length > 0);
  }, [searchQuery]);

  const toggleTerm = (termId: string) => {
    setExpandedTerms((prev) => {
      const next = new Set(prev);
      if (next.has(termId)) {
        next.delete(termId);
      } else {
        next.add(termId);
      }
      return next;
    });
  };

  const totalTerms = glossaryData.reduce((sum, cat) => sum + cat.terms.length, 0);

  return (
    <LearnLayout
      title="光通信术语表"
      subtitle={`快速查阅光通信领域的核心概念和术语，共 ${totalTerms} 个词条`}
      currentIndex={8}
      totalChapters={9}
      prevChapter={{ path: '/learn/receiver', title: '光接收器', icon: <Radio className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lab-muted" />
          <input
            type="text"
            placeholder="搜索术语..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-lab-bg/50 border border-lab-border rounded-xl text-lab-text placeholder-lab-muted focus:outline-none focus:border-laser-cyan/50 transition-colors"
          />
        </div>

        <div className="space-y-8">
          {filteredData.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
                {category.icon}
                {category.name}
                <span className="text-sm font-normal text-lab-muted">
                  ({category.terms.length} 个术语
                </span>
              </h2>

              <div className="space-y-3">
                {category.terms.map((term, termIndex) => {
                  const termId = `${category.id}-${termIndex}`;
                  const isExpanded = expandedTerms.has(termId);
                  const hasDetail = !!term.detail;

                  return (
                    <motion.div
                      key={termId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + termIndex * 0.05 }}
                      className="bg-lab-bg/50 border border-lab-border/50 rounded-xl overflow-hidden"
                    >
                      <div
                        className={`p-4 ${hasDetail ? 'cursor-pointer hover:bg-lab-surface/30 transition-colors' : ''}`}
                        onClick={() => hasDetail && toggleTerm(termId)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-lab-text">{term.term}</span>
                              {term.english && (
                                <span className="text-sm text-lab-muted font-mono">
                                  {term.english}
                                </span>
                              )}
                            </div>
                            <p className="text-lab-muted text-sm leading-relaxed">
                              {term.definition}
                            </p>
                          </div>
                          {hasDetail && (
                            <BookText
                              className={`w-5 h-5 text-lab-muted flex-shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-0' : ''}`}
                            />
                          )}
                        </div>
                      </div>

                      {hasDetail && isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-lab-border/50"
                        >
                          <div className="p-4 bg-laser-cyan/5">
                            <p className="text-lab-muted text-sm leading-relaxed">
                              {term.detail}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-12 text-lab-muted">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>没有找到匹配的术语</p>
            </div>
          )}
        </div>
      </section>
    </LearnLayout>
  );
}
