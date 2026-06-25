import { Flame, Waves } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';

export default function LearnLaser() {
  return (
    <LearnLayout
      title="激光器原理"
      subtitle="光的产生：受激辐射、激光谐振腔与常见激光器类型"
      currentIndex={1}
      totalChapters={8}
      prevChapter={{ path: '/learn/light-basics', title: '光波基础', icon: <Waves className="w-4 h-4" /> }}
      nextChapter={{ path: '/learn/interference', title: '干涉原理', icon: <Waves className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-laser-red" />
          从自发辐射到受激辐射
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            激光器（Laser）是"受激辐射光放大"（Light Amplification by Stimulated Emission of Radiation）的缩写。
            要理解激光的产生，我们需要先了解光与物质相互作用的三种基本过程。
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">自发辐射</h4>
              <p className="text-sm">
                处于高能级的粒子自发地从高能级跃迁到低能级，同时发射一个光子。
                普通光源（如白炽灯、LED）的发光就属于自发辐射，发出的光是不相干的。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">受激吸收</h4>
              <p className="text-sm">
                处于低能级的粒子吸收一个光子，跃迁到高能级。
                这就是光被物质吸收的过程。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">受激辐射</h4>
              <p className="text-sm">
                处于高能级的粒子在入射光子的"刺激"下，跃迁到低能级，
                同时发射一个与入射光子<strong>完全相同</strong>的光子（同频率、同相位、同方向、同偏振）。
                这是激光产生的核心机制。
              </p>
            </div>
          </div>
          <div className="bg-lab-bg/50 px-4 py-3 rounded-lg">
            <MathRenderer>{'$$E_2 - E_1 = h\\nu = \\frac{hc}{\\lambda}$$'}</MathRenderer>
            <p className="text-sm mt-2">
              其中 h 是普朗克常数，ν 是光的频率。光子能量等于两个能级之间的能量差。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          粒子数反转与光放大
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在热平衡状态下，低能级的粒子数总是多于高能级的粒子数（玻尔兹曼分布），
            因此光通过物质时总体上是被吸收的。要实现光放大，必须使
            <span className="text-laser-red font-semibold"> 高能级的粒子数多于低能级</span>，
            这就是<span className="text-laser-red font-semibold">粒子数反转</span>。
          </p>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <div className="text-center mb-3 font-semibold text-lab-text">粒子数反转示意</div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-xs text-lab-muted text-center mb-2">热平衡状态</div>
                <div className="flex items-end justify-center gap-4 h-24">
                  <div className="w-8 bg-lab-border/50 rounded-t" style={{ height: '60%' }}>
                    <div className="text-center text-xs pt-1">E₂</div>
                  </div>
                  <div className="w-8 bg-lab-border/50 rounded-t" style={{ height: '100%' }}>
                    <div className="text-center text-xs pt-1">E₁</div>
                  </div>
                </div>
                <div className="text-xs text-center mt-2 text-lab-muted">N₁ &gt; N₂ → 吸收</div>
              </div>
              <div>
                <div className="text-xs text-lab-muted text-center mb-2">粒子数反转</div>
                <div className="flex items-end justify-center gap-4 h-24">
                  <div className="w-8 bg-laser-red/50 rounded-t" style={{ height: '90%' }}>
                    <div className="text-center text-xs pt-1">E₂</div>
                  </div>
                  <div className="w-8 bg-laser-red/50 rounded-t" style={{ height: '40%' }}>
                    <div className="text-center text-xs pt-1">E₁</div>
                  </div>
                </div>
                <div className="text-xs text-center mt-2 text-laser-red">N₂ &gt; N₁ → 放大</div>
              </div>
            </div>
          </div>
          <p>
            实现粒子数反转需要外部能量源（称为"泵浦"）将粒子从低能级"抽运"到高能级。
            泵浦方式包括光泵浦、电泵浦、化学泵浦等。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          激光谐振腔
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            仅有粒子数反转还不能产生激光，因为自发辐射产生的光子是随机的。
            我们需要一个<span className="text-laser-cyan font-semibold">光学谐振腔</span>
            来选择特定频率和方向的光子，让它们在腔内来回反射，
            不断刺激更多的受激辐射，实现光的放大。
          </p>
          <div className="bg-lab-bg/50 p-5 rounded-xl">
            <div className="text-center mb-3 font-semibold text-lab-text">激光谐振腔结构</div>
            <div className="flex items-center justify-center gap-0 h-24">
              <div className="w-2 h-20 bg-lab-border rounded-l" />
              <div className="w-40 h-12 bg-laser-cyan/10 border-y border-laser-cyan/30 flex items-center justify-center">
                <div className="text-laser-cyan text-xs">增益介质</div>
              </div>
              <div className="w-1 h-20 bg-laser-green/50 rounded-r" />
              <div className="ml-2 text-laser-green text-xs">→ 输出</div>
            </div>
            <div className="text-xs text-lab-muted text-center mt-3">
              全反射镜（左） + 增益介质 + 部分反射镜（右，输出耦合器）
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-cyan/20 text-laser-cyan flex items-center justify-center flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">阈值条件</h4>
                <p className="text-sm">
                  只有当增益大于损耗时，激光才能产生。这个最低的增益称为激光阈值。
                  阈值以下只有自发辐射（荧光），达到阈值后受激辐射占主导，产生激光。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-laser-green/20 text-laser-green flex items-center justify-center flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-lab-text">纵模与横模</h4>
                <p className="text-sm">
                  谐振腔只允许满足驻波条件（腔长为半波长整数倍）的频率存在，称为纵模。
                  横模描述的是光场在垂直于传播方向截面上的分布（如 TEM₀₀ 基模）。
                </p>
                <div className="bg-lab-bg/50 px-4 py-2 rounded-lg mt-2 text-xs">
                  <MathRenderer>{'$$L = q \\cdot \\frac{\\lambda}{2} \\quad (q \\text{ 为整数})$$'}</MathRenderer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          激光器的类型
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            按增益介质分类，常见的激光器有：
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-red mb-2">气体激光器</h4>
              <p className="text-sm">
                以气体为增益介质。典型代表：<br />
                <span className="text-lab-text">• He-Ne 激光器</span>：632.8 nm 红光，相干性好<br />
                <span className="text-lab-text">• 二氧化碳激光器</span>：10.6 μm 红外，功率高
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-green mb-2">固体激光器</h4>
              <p className="text-sm">
                以固体材料为增益介质。典型代表：<br />
                <span className="text-lab-text">• 红宝石激光器</span>：694.3 nm，第一台激光器<br />
                <span className="text-lab-text">• 掺铒光纤激光器</span>：1550 nm 波段，光通信主力
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-cyan mb-2">半导体激光器</h4>
              <p className="text-sm">
                以半导体材料为增益介质，电注入泵浦。体积小、效率高、可直接调制，
                是光通信系统中最常用的光源。典型波长：1310 nm、1550 nm。
              </p>
            </div>
            <div className="bg-lab-bg/50 p-4 rounded-xl">
              <h4 className="font-semibold text-laser-purple mb-2">光纤激光器</h4>
              <p className="text-sm">
                以掺杂光纤为增益介质，光束质量好、散热好、功率高。
                广泛应用于工业加工、医疗、科研等领域。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          激光的特性与应用
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lab-text mb-2">激光的四大特性：</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span><span className="text-laser-red font-medium">方向性好：</span>发散角极小，接近平行光</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span><span className="text-laser-green font-medium">单色性好：</span>谱线宽度极窄，接近单色光</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span><span className="text-laser-cyan font-medium">相干性好：</span>时间相干和空间相干都很好</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span><span className="text-laser-purple font-medium">能量集中：</span>功率密度高，可用于切割、焊接等</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lab-text mb-2">光通信中的激光器：</h3>
              <p className="text-sm mb-2">
                在光通信系统中，激光器是发射端的核心器件：
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">→</span>
                  <span>DFB 激光器：分布反馈，单纵模，高速调制</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">→</span>
                  <span>外腔激光器：线宽窄，相干通信首选</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">→</span>
                  <span>可调谐激光器：可选择波长，WDM 系统必备</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">
          下一步：干涉原理
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            有了激光这个相干光源，我们就可以观察到清晰的干涉现象。
            光的干涉是光调制器的物理基础。下一章我们将学习光波的叠加与干涉原理，
            理解如何通过控制相位差来控制光强。
          </p>
        </div>
      </section>
    </LearnLayout>
  );
}
