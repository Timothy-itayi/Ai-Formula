import * as React from "react"
import clsx from "clsx"

// Card component - Base container for card content
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={clsx(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )} 
    {...props} 
  />
))
Card.displayName = "Card"

// Card Header component - Container for card title and description
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={clsx(
      "flex flex-col space-y-1.5 p-6",
      className
    )} 
    {...props} 
  />
))
CardHeader.displayName = "CardHeader"

// Card Title component - Main heading of the card
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 
    ref={ref} 
    className={clsx(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )} 
    {...props} 
  />
))
CardTitle.displayName = "CardTitle"

// Card Description component - Secondary text below the title
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p 
    ref={ref} 
    className={clsx(
      "text-sm text-muted-foreground",
      className
    )} 
    {...props} 
  />
))
CardDescription.displayName = "CardDescription"

// Card Content component - Main content area of the card
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={clsx(
      "p-6 pt-0",
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

// Card Footer component - Bottom section of the card, often used for actions
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={clsx(
      "flex items-center p-6 pt-0",
      className
    )} 
    {...props} 
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }