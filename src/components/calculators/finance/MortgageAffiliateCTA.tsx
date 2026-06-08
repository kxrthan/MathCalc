"use client";

import { ExternalLink, TrendingDown, Shield, Star } from "lucide-react";

interface MortgageAffiliateCTAProps {
  monthlyPayment: string;
  interestRate: string;
}

export default function MortgageAffiliateCTA({ monthlyPayment, interestRate }: MortgageAffiliateCTAProps) {
  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-8 rounded-full bg-emerald-500"></span>
        <h3 className="text-lg font-bold text-foreground">
          Ready to Lock In Your Rate?
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        Your estimated payment is <strong className="text-foreground">{monthlyPayment}/mo</strong> at <strong className="text-foreground">{interestRate}%</strong>. Compare real lenders to see if you can do better — it takes 3 minutes and won&apos;t affect your credit score.
      </p>

      {/* CTA Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* LendingTree */}
        <a
          href="https://www.lendingtree.com/home/mortgage/?itype=purchase&channel=paid_search&cscore=740&prop=SingleFamily&intent=purchase&loanamt=250000&state=US&src=mathcalc"
          target="_blank"
          rel="noopener noreferrer sponsored"
          id="affiliate-lendingtree"
          className="group relative flex flex-col gap-3 p-4 rounded-2xl border border-foreground/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <p className="font-bold text-foreground text-sm">LendingTree</p>
              <p className="text-xs text-muted-foreground">Compare 5+ lenders at once</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 transition-colors flex-shrink-0 mt-0.5" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Rates from 6.49% APR — No credit impact
            </span>
          </div>
          <span className="w-full text-center py-2 text-sm font-bold rounded-xl bg-emerald-500 text-white group-hover:bg-emerald-600 transition-colors">
            Compare Rates Free →
          </span>
        </a>

        {/* Rocket Mortgage */}
        <a
          href="https://www.rocketmortgage.com/?qlsource=mathcalctools&utm_source=partner&utm_medium=referral&utm_campaign=mathcalc"
          target="_blank"
          rel="noopener noreferrer sponsored"
          id="affiliate-rocket-mortgage"
          className="group relative flex flex-col gap-3 p-4 rounded-2xl border border-foreground/20 bg-gradient-to-br from-red-500/10 to-orange-500/5 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <p className="font-bold text-foreground text-sm">Rocket Mortgage</p>
              <p className="text-xs text-muted-foreground">#1 US Mortgage Lender 2024</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors flex-shrink-0 mt-0.5" />
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-500" />
            <span className="text-xs font-semibold text-red-600 dark:text-red-400">
              Close in 8 days — 100% Online Process
            </span>
          </div>
          <span className="w-full text-center py-2 text-sm font-bold rounded-xl bg-red-500 text-white group-hover:bg-red-600 transition-colors">
            Get Pre-Approved Now →
          </span>
        </a>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground/60 mt-3 text-center">
        Sponsored links · Rates are estimates and vary by credit score and location. MathCalc may receive a commission.
      </p>
    </div>
  );
}
