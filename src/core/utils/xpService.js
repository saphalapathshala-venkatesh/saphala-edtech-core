// File: src/core/utils/xpService.js (Central XP and Sadhana Logic)

// XP tiers based on your defined rules: (1-25 Qs = 10 XP, etc.)
const BASE_XP_TIERS = [
    { maxQs: 25, base: 10 },
    { maxQs: 50, base: 20 },
    { maxQs: 100, base: 40 },
    { maxQs: Infinity, base: 50 },
];

const RANK_BONUS = [
    { rank: 5, bonus: 10 }, // Rank 1-5 gets +10 XP
    { rank: 10, bonus: 5 }, // Rank 6-10 gets +5 XP
];

export const SADHANA_XP = {
    DAILY_LOGIN: 5,
    WEEKLY_SADHANA: 25,
    MONTHLY_SADHANA: 100,
};

/**
 * Calculates total XP for a test submission based on rules.
 * @param {number} totalQuestions - Total Qs in the test.
 * @param {number} finalRank - Student's rank.
 * @param {number} attemptNumber - Which attempt this is (1, 2, 3...).
 * @returns {number} The total XP earned.
 */
export const calculateTestXP = (totalQuestions, finalRank, attemptNumber) => {
    // 1. Calculate Base XP
    const baseTier = BASE_XP_TIERS.find(tier => totalQuestions <= tier.maxQs);
    let baseXP = baseTier ? baseTier.base : 0;

    // 2. Apply XP Logic based on Attempt Number
    if (attemptNumber >= 3) {
        return 0; // 3rd attempt onward gets 0 XP
    }
    if (attemptNumber === 2) {
        // Second attempt gets 35% of the original base XP, rounded to nearest integer
        return Math.round(baseXP * 0.35);
    }
    
    // 3. First Attempt: Add Rank Bonus
    let rankBonus = 0;
    const bonusTier = RANK_BONUS.find(tier => finalRank <= tier.rank);
    if (bonusTier) {
        rankBonus = bonusTier.bonus;
    }

    return baseXP + rankBonus; // First attempt gets full base + bonus
};

// Placeholder for Flashcard XP logic (Admin set value)
export const calculateFlashcardXP = (adminSetXP) => {
    return adminSetXP;
};

// Placeholder for generating the AI bilingual motivational message
export const generateMotivationMessage = (rank, percentile) => {
    const isTopPerformer = percentile >= 85;
    const message_en = isTopPerformer 
        ? `Outstanding effort! Your rank (${rank}) confirms you are ready for the main exam.`
        : `Strong performance! Focus on your weak areas now to climb into the Top 10%.`;
    const message_te = isTopPerformer
        ? `అద్భుతమైన కృషి! మీ ర్యాంక్ (${rank}) మీరు ప్రధాన పరీక్షకు సిద్ధంగా ఉన్నారని నిర్ధారిస్తుంది.`
        : `మంచి పనితీరు! తదుపరి 10% లోకి ఎదగడానికి మీ బలహీన ప్రాంతాలపై దృష్టి పెట్టండి.`;
    
    return { message_en, message_te };
};