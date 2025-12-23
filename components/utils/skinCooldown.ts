export const SKIN_ANALYSIS_COOLDOWN_DAYS = 7;

export function getSkinAnalysisCooldown(createdAt?: string) {
  if (!createdAt) {
    return {
      canAnalyze: true,
      remainingDays: 0,
      remainingHours: 0,
    };
  }

  const createdDate = new Date(createdAt);
  const now = new Date();

  const cooldownEnd = new Date(createdDate);
  cooldownEnd.setDate(cooldownEnd.getDate() + SKIN_ANALYSIS_COOLDOWN_DAYS);

  const diffMs = cooldownEnd.getTime() - now.getTime();

  if (diffMs <= 0) {
    return {
      canAnalyze: true,
      remainingDays: 0,
      remainingHours: 0,
    };
  }

  const remainingHoursTotal = Math.ceil(diffMs / (1000 * 60 * 60));
  const remainingDays = Math.floor(remainingHoursTotal / 24);
  const remainingHours = remainingHoursTotal % 24;

  return {
    canAnalyze: false,
    remainingDays,
    remainingHours,
  };
}
