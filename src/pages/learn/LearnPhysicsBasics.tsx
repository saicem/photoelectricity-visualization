import { BookOpen, Zap, Gauge, Lightbulb, BatteryFull, Ban } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';

export default function LearnPhysicsBasics() {
  return (
    <LearnLayout
      title="基础物理定义"
      subtitle="回顾光通信中常用的物理量：光、场、功率、能量、电流、电压、电阻"
      currentIndex={0}
      totalChapters={10}
      partTitle="Part 1 · 基础篇"
      nextChapter={{ path: '/learn/light-basics', title: '光波基础', icon: <Lightbulb className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-laser-cyan" />
          光波基本关系
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            光是一种电磁波，在真空中的传播速度为恒定值 <span className="text-laser-cyan font-mono">c ≈ 3×10⁸ m/s</span>。
            波长、频率与光速满足基本关系：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$c = \\lambda \\cdot f$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">λ</span> 为波长，<span className="text-laser-green font-mono">f</span> 为频率。
            光子的能量由普朗克关系给出：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E = hf = \\frac{hc}{\\lambda}$$'}</MathRenderer>
          </div>
          <p>
            <span className="text-laser-cyan font-mono">h ≈ 6.626×10⁻³⁴ J·s</span> 为普朗克常数。
            频率越高（波长越短），光子携带的能量越大。在 1550 nm 通信波段，
            光子能量约为 <span className="text-laser-purple font-mono">0.8 eV</span>。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-laser-green" />
          电场与磁场
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            电场强度 <span className="text-laser-cyan font-mono">E</span> 描述了空间中某点
            所受电场力的大小和方向。在均匀电场中，电场强度与电压和距离的关系为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E = \\frac{V}{d}$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">V</span> 为电压差，
            <span className="text-laser-green font-mono">d</span> 为两极板间的距离。
            在光调制器中，外加电压在电极之间产生电场，通过 <TermNote term="电光效应" /> 改变材料的折射率。
          </p>
          <p>
            光波本身携带交变电场和磁场，电场强度沿传播方向的空间变化可表示为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E(z,t) = E_0 \\cos(\\omega t - kz + \\phi_0)$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">E₀</span> 为电场振幅，
            <span className="text-laser-green font-mono">ω = 2πf</span> 为角频率，
            <span className="text-laser-purple font-mono">k = 2π/λ</span> 为波数，
            <span className="text-laser-orange font-mono">φ₀</span> 为初相位。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-laser-purple" />
          功率与能量
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <h3 className="font-semibold text-lab-text">电功率</h3>
          <p>
            电功率表示电能传输或转换的速率。在直流电路中，电压和电流的乘积即为功率：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$P = V \\cdot I$$'}</MathRenderer>
          </div>
          <p>
            结合欧姆定律可得到另外两种等价形式：
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$P = I^2 R$$'}</MathRenderer>
            </div>
            <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
              <MathRenderer>{'$$P = \\frac{V^2}{R}$$'}</MathRenderer>
            </div>
          </div>

          <h3 className="font-semibold text-lab-text pt-2">光功率</h3>
          <p>
            在光学中，光功率（光强）是单位面积上通过的光能量。光功率与电场振幅的平方成正比：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$I \\propto |E_0|^2$$'}</MathRenderer>
          </div>
          <p>
            光通信系统中常用 <span className="text-laser-cyan font-mono">dBm</span> 表示光功率：
            <span className="text-laser-green font-mono">P(dBm) = 10·log₁₀(P(mW))</span>。
            例如 <span className="text-laser-green font-mono">1 mW = 0 dBm</span>，
            <span className="text-laser-cyan font-mono">0.1 mW = -10 dBm</span>。
          </p>

          <h3 className="font-semibold text-lab-text pt-2">能量</h3>
          <p>
            能量表示做功的能力。电能与功率和时间的乘积相关：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$W = P \\cdot t$$'}</MathRenderer>
          </div>
          <p>
            对于光信号，每个光子携带的能量为 <span className="text-laser-cyan font-mono">E = hf</span>，
            光功率与光子数流率的关系为：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$P = N \\cdot hf$$'}</MathRenderer>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">N</span> 为单位时间通过的光子数。
            在光接收机中，光电二极管将入射光功率转换为光电流：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$I_{photo} = R \\cdot P_{opt}$$'}</MathRenderer>
          </div>
          <p>
            <span className="text-laser-cyan font-mono">R</span> 为光电二极管的<TermNote term="响应度" />，
            单位 A/W，典型值约为 <span className="text-laser-cyan font-mono">0.8-1.0 A/W</span>。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <BatteryFull className="w-5 h-5 text-laser-red" />
          电流、电压与电阻
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            这三个基本电学量通过<span className="text-laser-cyan font-semibold">欧姆定律</span>紧密联系在一起：
          </p>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$V = I \\cdot R$$'}</MathRenderer>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2 text-sm">电压 V</h4>
              <p className="text-xs text-lab-muted mb-2">驱动电荷定向移动的"推动力"，单位伏特 (V)。</p>
              <div className="bg-lab-bg/30 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$V = \\frac{W}{Q}$$'}</MathRenderer>
              </div>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2 text-sm">电流 I</h4>
              <p className="text-xs text-lab-muted mb-2">单位时间内通过导体横截面的电荷量，单位安培 (A)。</p>
              <div className="bg-lab-bg/30 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$I = \\frac{dQ}{dt}$$'}</MathRenderer>
              </div>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-orange mb-2 text-sm">电阻 R</h4>
              <p className="text-xs text-lab-muted mb-2">导体对电流阻碍作用的大小，单位欧姆 (Ω)。</p>
              <div className="bg-lab-bg/30 px-3 py-2 rounded-lg text-xs">
                <MathRenderer>{'$$R = \\rho \\frac{L}{A}$$'}</MathRenderer>
              </div>
            </div>
          </div>
          <p>
            其中 <span className="text-laser-cyan font-mono">ρ</span> 为电阻率（材料固有属性），
            <span className="text-laser-green font-mono">L</span> 为导体长度，
            <span className="text-laser-purple font-mono">A</span> 为导体横截面积。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <Ban className="w-5 h-5 text-laser-orange" />
          单位换算与常用常数表
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lab-border/50">
                <th className="py-2 px-3 text-left text-lab-text font-semibold">物理量</th>
                <th className="py-2 px-3 text-left text-lab-text font-semibold">符号</th>
                <th className="py-2 px-3 text-left text-lab-text font-semibold">常用单位</th>
                <th className="py-2 px-3 text-left text-lab-text font-semibold">换算关系</th>
              </tr>
            </thead>
            <tbody className="text-lab-muted">
              <tr className="border-b border-lab-border/30">
                <td className="py-2 px-3 text-laser-cyan">光速</td>
                <td className="py-2 px-3 font-mono">c</td>
                <td className="py-2 px-3">m/s</td>
                <td className="py-2 px-3 font-mono">≈ 3.0 × 10⁸</td>
              </tr>
              <tr className="border-b border-lab-border/30">
                <td className="py-2 px-3 text-laser-green">普朗克常数</td>
                <td className="py-2 px-3 font-mono">h</td>
                <td className="py-2 px-3">J·s</td>
                <td className="py-2 px-3 font-mono">6.626 × 10⁻³⁴</td>
              </tr>
              <tr className="border-b border-lab-border/30">
                <td className="py-2 px-3 text-laser-purple">基本电荷</td>
                <td className="py-2 px-3 font-mono">e</td>
                <td className="py-2 px-3">C</td>
                <td className="py-2 px-3 font-mono">1.602 × 10⁻¹⁹</td>
              </tr>
              <tr className="border-b border-lab-border/30">
                <td className="py-2 px-3 text-laser-red">波长 (1550 nm)</td>
                <td className="py-2 px-3 font-mono">λ</td>
                <td className="py-2 px-3">nm</td>
                <td className="py-2 px-3 font-mono">1 nm = 10⁻⁹ m</td>
              </tr>
              <tr className="border-b border-lab-border/30">
                <td className="py-2 px-3 text-laser-orange">频率 (1550 nm)</td>
                <td className="py-2 px-3 font-mono">f</td>
                <td className="py-2 px-3">THz</td>
                <td className="py-2 px-3 font-mono">≈ 193.4 THz</td>
              </tr>
              <tr className="border-b border-lab-border/30">
                <td className="py-2 px-3 text-laser-cyan">光子能量 (1550 nm)</td>
                <td className="py-2 px-3 font-mono">E</td>
                <td className="py-2 px-3">eV</td>
                <td className="py-2 px-3 font-mono">≈ 0.8 eV</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-laser-green">dBm → mW</td>
                <td className="py-2 px-3 font-mono">P</td>
                <td className="py-2 px-3">dBm</td>
                <td className="py-2 px-3 font-mono">P(mW) = 10^(P(dBm)/10)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-lab-muted mt-3">
          注意：1 eV = 1.602×10⁻¹⁹ J，eV 是微观粒子能量常用的单位。
          1550 nm 是光通信 C 波段的标准波长。
        </p>
      </section>
    </LearnLayout>
  );
}
