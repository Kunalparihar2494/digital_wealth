import { IHoldingShares } from "../model/shares.interface";

export type ProfitLossSummary = {
  pnl: string;
  portfolioValue: string;
  percentage: string;
  gains: string;
  isProfit: boolean;
};

export function getProfitLossSummary(
  holdings: IHoldingShares[],
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
      "en-IN",
    )}`,
    portfolioValue: `₹${totalCurrentValue.toLocaleString("en-IN")}`,
    percentage: `${pnlPercent.toFixed(2)}%`,
    gains: `₹${totalInvested.toLocaleString("en-IN")}`,
    isProfit: pnlValue >= 0,
  };
}

export const formatBalance = (amount?: number | string) => {
  const value = Number(amount || 0);

  if (value >= 10000000) {
    // Crores
    return `₹${(value / 10000000).toFixed(value >= 100000000 ? 0 : 1)}Cr`;
  }

  if (value >= 100000) {
    // Lakhs
    return `₹${(value / 100000).toFixed(value >= 1000000 ? 0 : 1)}L`;
  }

  if (value >= 1000) {
    // Thousands
    return `₹${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  }

  return `₹${value}`;
};
