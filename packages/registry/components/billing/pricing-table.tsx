"use client"

import * as React from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PricingFeature {
  name: string
  included: boolean
}

interface PricingTier {
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: PricingFeature[]
  cta: string
  popular?: boolean
  disabled?: boolean
}

interface PricingTableProps {
  tiers: PricingTier[]
  yearly?: boolean
  onSelect?: (tier: PricingTier) => void
  className?: string
}

export function PricingTable({
  tiers,
  yearly = false,
  onSelect,
  className,
}: PricingTableProps) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-3", className)}>
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={cn(
            "flex flex-col",
            tier.popular && "border-primary shadow-lg relative"
          )}
        >
          {tier.popular && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
              Most Popular
            </Badge>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{tier.name}</CardTitle>
            <CardDescription>{tier.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6">
              <span className="text-4xl font-bold">
                ${yearly ? tier.price.yearly : tier.price.monthly}
              </span>
              <span className="text-muted-foreground">
                /{yearly ? "year" : "month"}
              </span>
              {yearly && tier.price.yearly < tier.price.monthly * 12 && (
                <p className="text-sm text-green-600 mt-1">
                  Save ${tier.price.monthly * 12 - tier.price.yearly}/year
                </p>
              )}
            </div>
            <ul className="space-y-3">
              {tier.features.map((feature) => (
                <li key={feature.name} className="flex items-center gap-3">
                  {feature.included ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      !feature.included && "text-muted-foreground"
                    )}
                  >
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={tier.popular ? "default" : "outline"}
              disabled={tier.disabled}
              onClick={() => onSelect?.(tier)}
            >
              {tier.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

// Example configuration
export const exampleTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for side projects and small teams",
    price: { monthly: 0, yearly: 0 },
    features: [
      { name: "Up to 3 projects", included: true },
      { name: "1,000 API calls/month", included: true },
      { name: "Community support", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Custom domains", included: false },
      { name: "SSO", included: false },
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    description: "For growing businesses and teams",
    price: { monthly: 29, yearly: 290 },
    features: [
      { name: "Unlimited projects", included: true },
      { name: "50,000 API calls/month", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom domains", included: true },
      { name: "SSO", included: false },
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: { monthly: 99, yearly: 990 },
    features: [
      { name: "Unlimited everything", included: true },
      { name: "Unlimited API calls", included: true },
      { name: "24/7 phone support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom domains", included: true },
      { name: "SSO & SAML", included: true },
    ],
    cta: "Contact Sales",
  },
]
