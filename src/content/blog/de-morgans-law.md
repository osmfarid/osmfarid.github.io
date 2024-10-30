---
title: De Morgan's laws
pubDatetime: 2024-10-30T13:58:25Z
draft: false
tags:
  - boolean-algebra
description: Simplify logical expressions in TypeScript using De Morgan's laws.
---
# De Morgan's Laws in TypeScript

De Morgan's laws are fundamental in logic and set theory, providing equivalences that are very helpful when working with conditions in code. In TypeScript (or any other programming language), they can be used to simplify boolean expressions, making your code cleaner and easier to understand.

## Table of contents

## De Morgan's Laws Explained

De Morgan's laws can be expressed in two main equivalences:

1. $\neg (A \land B) = (\neg A) \lor (\neg B)$
2. $\neg (A \lor B) = (\neg A) \land (\neg B)$

In words:

- The **negation of a conjunction** is the **disjunction of the negations**.
- The **negation of a disjunction** is the **conjunction of the negations**.

These can be very useful when dealing with complex conditional logic.

## TypeScript Examples

Let's look at a couple of examples to illustrate De Morgan's laws.

### Example 1: Simplifying Conditions

Suppose you have a condition where you want to check:  
if *neither* `isSunny` nor `isWarm` is true.

Without De Morgan's law, you might write:

```typescript
if (!(isSunny && isWarm)) {
  console.log("It is not sunny or warm.");
}
```

Using De Morgan's law, you can simplify this to:

```typescript
if (!isSunny || !isWarm) {
  console.log("It is not sunny or warm.");
}
```

This makes the condition easier to read and understand, as you are directly checking for the negation of each individual condition.

### Example 2: Conditional Rendering

Consider the following scenario where you want to show a message if neither `isUserLoggedIn` nor `hasPermission` is true:

```typescript
const isUserLoggedIn = false;
const hasPermission = false;

if (!(isUserLoggedIn || hasPermission)) {
  console.log("Access denied.");
}
```

Applying De Morgan's law, you can rewrite it as:

```typescript
if (!isUserLoggedIn && !hasPermission) {
  console.log("Access denied.");
}
```

This makes the intent more explicit:  
both conditions must be false for the message to be logged.

## Summary

De Morgan's laws are a powerful tool to simplify logical expressions.  
They help make your conditions more readable.

By applying these laws, you can reduce the mental load required to understand nested negations and make your TypeScript code much cleaner and maintainable.

