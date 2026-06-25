import { Zap, CircuitBoard, Compass, Radio } from 'lucide-react';
import LearnLayout from '@/components/common/LearnLayout';
import MathRenderer from '@/components/common/MathRenderer';
import TermNote from '@/components/common/TermNote';

export default function LearnDualPolarization() {
  return (
    <LearnLayout
      title="高级调制"
      subtitle="从 DP-IQ 到 Nyquist 整形、OFDM 与概率星座整形，逼近香农极限的调制技术"
      currentIndex={6}
      totalChapters={9}
      prevChapter={{ path: '/learn/polarization', title: '偏振复用', icon: <Compass className="w-4 h-4" /> }}
      nextChapter={{ path: '/learn/receiver', title: '光接收器', icon: <Radio className="w-4 h-4" /> }}
    >
      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-laser-cyan" />
          从基础到高级：调制技术的演进
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            前面几章我们学习了光波基础、MZ 调制器、IQ 正交调制和偏振复用。
            <span className="text-laser-cyan font-semibold">DP-IQ 调制器 (Dual-Polarization IQ Modulator)</span>
            将这些技术集成在一起，实现了单波长 200G/400G 的传输速率。
          </p>
          <p>
            然而，随着数据流量爆炸式增长，光通信系统需要不断逼近
            <TermNote term="香农极限" />。
            本章将介绍几种关键的<strong>高级调制技术</strong>：
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-cyan/20">
              <h4 className="font-semibold text-laser-cyan mb-1">Nyquist 脉冲整形</h4>
              <p className="text-sm">压缩信号带宽，提高频谱效率</p>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-purple/20">
              <h4 className="font-semibold text-laser-purple mb-1">光 OFDM</h4>
              <p className="text-sm">多载波调制，抗色散能力强</p>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-green/20">
              <h4 className="font-semibold text-laser-green mb-1">概率星座整形</h4>
              <p className="text-sm">不等概率星座点，逼近<TermNote term="香农极限" /></p>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl border border-laser-red/20">
              <h4 className="font-semibold text-laser-red mb-1">DP-IQ 回顾</h4>
              <p className="text-sm">上述技术的硬件基础与平台</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4 flex items-center gap-2">
          <CircuitBoard className="w-5 h-5 text-laser-cyan" />
          DP-IQ 调制器回顾
        </h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-cyan font-semibold">DP-IQ 调制器</span>
            是一切高级调制技术的硬件基础。它将输入激光分为 X 和 Y 两个正交偏振态，
            分别通过独立的 IQ 调制器进行调制，最后经
            <TermNote term="偏振合束器 (PBC)" />输出。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">结构组成</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>偏振分束器 (PBS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>X 偏振 IQ 调制器 (I_x, Q_x)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>Y 偏振 IQ 调制器 (I_y, Q_y)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>偏振旋转器 + 偏振合束器 (PBC)</span>
                </li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">典型传输容量</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-laser-cyan">•</span>
                  <span>DP-QPSK：100G (单波长)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-green">•</span>
                  <span>DP-16QAM：200G - 400G</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-purple">•</span>
                  <span>DP-64QAM：600G - 800G</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-laser-red">•</span>
                  <span>DP-256QAM：1T+</span>
                </li>
              </ul>
            </div>
          </div>
          <p>四路驱动信号 (I_x, Q_x, I_y, Q_y) 独立加载不同的数据，每个符号同时在幅度、相位和偏振三个维度上携带信息。</p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">Nyquist 脉冲整形</h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            在传统的<TermNote term="NRZ 调制" />调制中，矩形脉冲的频谱包含大量的
            <TermNote term="旁瓣" />，占用额外的带宽。
            <span className="text-laser-green font-semibold">Nyquist 脉冲整形</span>
            通过<strong>升余弦滤波器 (Raised-Cosine Filter)</strong> 在发送端对脉冲进行整形，
            将信号带宽严格限制在<TermNote term="奈奎斯特频率" />以内。
          </p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>{'$$H(f) = \\begin{cases} T, & |f| \\leq \\frac{1-\\alpha}{2T} \\\\ \\frac{T}{2} \\left[ 1 + \\cos\\left( \\frac{\\pi T}{\\alpha} \\left( |f| - \\frac{1-\\alpha}{2T} \\right) \\right) \\right], & \\frac{1-\\alpha}{2T} < |f| \\leq \\frac{1+\\alpha}{2T} \\\\ 0, & \\text{otherwise} \\end{cases}$$'}</MathRenderer>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2"><TermNote term="滚降因子 α" /></h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span><strong>α = 0</strong>：理想 Nyquist，带宽 = 1/(2T)，不可实现</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span><strong>α = 0.1 ~ 0.2</strong>：高速光通信常用，频谱效率高</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-purple">•</span><span><strong>α = 0.5 ~ 1</strong>：带宽宽，但抗定时误差强</span></li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2"><TermNote term="Nyquist-WDM" /></h4>
              <p className="text-sm">
                对每个波长的信号进行 Nyquist 整形后，可以将波长间隔压缩到接近信号
                <TermNote term="波特率" />，实现超高频谱效率的波分复用系统。
              </p>
            </div>
          </div>
          <p className="text-sm text-lab-muted italic">
            Nyquist 脉冲整形的核心优势：消除<TermNote term="码间干扰 (ISI)" />的同时，
            将<TermNote term="频谱效率" />推向理论极限 2 baud/Hz。
          </p>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">光 OFDM</h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-purple font-semibold"><TermNote term="OFDM" /></span>
            是一种多载波调制技术，它将高速数据流分配到多个<strong>正交子载波</strong>上并行传输。
            每个子载波上的符号速率较低，因此对<TermNote term="色散" />和<TermNote term="偏振模色散 (PMD)" />有天然的容忍度。
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2"><TermNote term="CO-OFDM" /></h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span>使用相干接收，恢复完整的电场信息</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span>频谱效率接近 Nyquist 单载波</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-purple">•</span><span>可通过<TermNote term="FFT/IFFT" />高效实现</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-red">•</span><span>无需复杂的<TermNote term="均衡器" /></span></li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">优劣势</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-green">✓</span><span>对色散容忍度高</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">✓</span><span>频谱利用率高</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-red">✗</span><span><TermNote term="峰均功率比 (PAPR)" />高</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-red">✗</span><span>对光纤非线性敏感</span></li>
              </ul>
            </div>
          </div>
          <div className="bg-lab-bg/40 p-4 rounded-lg mt-4">
            <p className="text-sm">
              <strong>OFDM vs. Nyquist 单载波：</strong>
              两者在频谱效率上接近，但 OFDM 通过 FFT 实现调制解调，接收端均衡更简单。
              Nyquist 单载波实现更成熟，PAPR 更低，是目前商用高速相干光系统的主流方案。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">概率星座整形</h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <p>
            <span className="text-laser-red font-semibold"><TermNote term="概率星座整形 (PCS)" /></span>
            是近年来光通信领域最重要的突破之一。传统的<TermNote term="QAM 调制" />调制中，所有
            <TermNote term="星座点" />等概率出现。
            PCS 的核心思想是：<strong>内部星座点出现概率更高，外部星座点出现概率更低</strong>。
          </p>
          <div className="bg-lab-bg/40 p-4 rounded-lg">
            <MathRenderer>{'$$P(x_i) = \\frac{e^{-\\lambda |x_i|^2}}{\\sum_j e^{-\\lambda |x_j|^2}} \\quad \\text{(Maxwell-Boltzmann 分布)}$$'}</MathRenderer>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2"><TermNote term="成形增益" />的来源</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span><strong>1.53 dB</strong>：二维理想成形增益上限</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span><strong>~1 dB</strong>：PCS-16QAM 实际成形增益</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-purple">•</span><span><strong>~1.5 dB</strong>：PCS-64QAM 实际成形增益</span></li>
              </ul>
            </div>
            <div className="bg-lab-bg/40 p-4 rounded-xl">
              <h4 className="font-semibold text-lab-text mb-2">工程实现</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2"><span className="text-laser-cyan">•</span><span><TermNote term="恒参分布匹配器 (CCDM)" /></span></li>
                <li className="flex items-start gap-2"><span className="text-laser-green">•</span><span><TermNote term="LDPC 纠错码" />联合优化</span></li>
                <li className="flex items-start gap-2"><span className="text-laser-purple">•</span><span>已被 ITU-T G.698.2 采纳</span></li>
              </ul>
            </div>
          </div>
          <div className="bg-lab-bg/40 px-4 py-3 rounded-lg border border-laser-red/30 mt-2">
            <p className="text-sm">
              <strong>实际效果</strong>：以 400G 传输为例，PCS-64QAM 相比传统 64QAM
              可以在相同<TermNote term="信噪比 (SNR)" />下传输更远距离，或在相同距离下提升约 15-20% 的传输容量。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-lab-surface/30 border border-lab-border/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold font-display text-lab-text mb-4">综合对比</h2>
        <div className="space-y-4 text-lab-muted leading-relaxed">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-lab-border">
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">技术</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">核心优势</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">主要挑战</th>
                  <th className="text-left py-2 px-3 text-lab-text font-semibold">商用状态</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-cyan">DP-IQ 调制器</td>
                  <td className="py-2 px-3">硬件基础，偏振复用</td>
                  <td className="py-2 px-3">功耗、集成度</td>
                  <td className="py-2 px-3 text-laser-green">成熟商用</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-green">Nyquist 整形</td>
                  <td className="py-2 px-3"><TermNote term="频谱效率" />高，无 ISI</td>
                  <td className="py-2 px-3"><TermNote term="DAC/ADC" />带宽要求高</td>
                  <td className="py-2 px-3 text-laser-green">广泛部署</td>
                </tr>
                <tr className="border-b border-lab-border/50">
                  <td className="py-2 px-3 text-laser-purple">光 OFDM</td>
                  <td className="py-2 px-3">抗色散，均衡简单</td>
                  <td className="py-2 px-3">PAPR 高，非线性敏感</td>
                  <td className="py-2 px-3 text-laser-cyan">研究/部分商用</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-laser-red">概率星座整形</td>
                  <td className="py-2 px-3">逼近<TermNote term="香农极限" /></td>
                  <td className="py-2 px-3"><TermNote term="数字信号处理 (DSP)" />复杂度增加</td>
                  <td className="py-2 px-3 text-laser-green">400G/800G 部署</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-lab-bg/40 px-4 py-3 rounded-lg mt-4">
            <p className="text-sm">
              在实际的商用系统中，这些技术常常<strong>叠加使用</strong>：基于 DP-IQ 调制器硬件，
              发送端使用 Nyquist 脉冲整形和 PCS 编码，结合先进的 LDPC 纠错码和
              <TermNote term="数字信号处理 (DSP)" />算法，实现接近香农极限的传输性能。
            </p>
          </div>
        </div>
      </section>
    </LearnLayout>
  );
}
