"use client"

import * as React from "react"
import { Input, InputProps } from "@/components/ui/input"

const PHONE_REGEX = /^[0-9\s+\-().]*$/

export interface PhoneInputProps extends Omit<InputProps, "onChange"> {
  onChange?: (value: string) => void
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      
      // Validation basique du format de téléphone
      if (PHONE_REGEX.test(value) || value === "") {
        // Formatage optionnel du numéro
        onChange?.(value)
      }
    }

    return (
      <Input
        ref={ref}
        type="tel"
        onChange={handleChange}
        {...props}
      />
    )
  }
)

PhoneInput.displayName = "PhoneInput" 