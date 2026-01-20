import { IHoldingShares } from "../model/shares.interface";

export type ProfitLossSummary = {
  pnl: string;
  portfolioValue: string;
  percentage: string;
  gains: string;
  isProfit: boolean;
};

export function getProfitLossSummary(
  holdings: IHoldingShares[]
): ProfitLossSummary {
  if (!holdings || holdings.length === 0) {
    return {
      pnl: "₹0",
      portfolioValue: "₹0",
      percentage: "0%",
      gains: "₹0",
      isProfit: true,
    };
  }

  let totalInvested = 0;
  let totalCurrentValue = 0;

  holdings.forEach((h) => {
    totalInvested += h.investedAmount;
    totalCurrentValue += h.currentValue;
  });

  const pnlValue = totalCurrentValue - totalInvested;
  const pnlPercent = totalInvested > 0 ? (pnlValue / totalInvested) * 100 : 0;

  return {
    pnl: `${pnlValue >= 0 ? "+" : "-"}₹${Math.abs(pnlValue).toLocaleString(
      "en-IN"
    )}`,
    portfolioValue: `₹${totalCurrentValue.toLocaleString("en-IN")}`,
    percentage: `${pnlPercent.toFixed(2)}%`,
    gains: `₹${totalInvested.toLocaleString("en-IN")}`,
    isProfit: pnlValue >= 0,
  };
}
