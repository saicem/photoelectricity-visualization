# 核心数学函数

## 光波干涉

```
I = I1 + I2 + 2√(I1·I2)cos(Δφ)
Δφ = (2π/λ)·Δx + Δφ₀
```

## MZ 调制器

```
E_out = E_in · cos(Δφ/2) · e^(i·Δφ/2)
P_out = P_in · cos²(Δφ/2) = P_in/2 · [1 + cos(Δφ)]

单臂:  Δφ = π·V/Vπ
双臂:  Δφ = π·(V₁−V₂)/Vπ
推挽:  Δφ = 2π·V/Vπ
```

## IQ 调制器

```
s(t) = I·cos(ωt) + Q·cos(ωt − Δφ)
当 Δφ = π/2 时: s(t) = I·cos(ωt) + Q·sin(ωt)
I_dec = I + Q·cos(Δφ)
Q_dec = Q·sin(Δφ)
```

## 斯托克斯矢量

```
S₀ = E_x² + E_y²
S₁ = E_x² − E_y²
S₂ = 2·E_x·E_y·cos(δ)
S₃ = 2·E_x·E_y·sin(δ)
DOP = √(S₁² + S₂² + S₃²) / S₀
```
