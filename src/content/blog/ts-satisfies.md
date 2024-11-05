---
title: "Using satisfies in TypeScript: A Step-by-Step Example"
pubDatetime: 2024-11-05T10:54:31Z
draft: false
tags:
  - typescript
description: Improve TypeScript safety using satisfies, keyof typeof, and Record.
---
# Using `satisfies` in TypeScript: A Step-by-Step Example

Today, I want to share an interesting example of using the `satisfies` operator in TypeScript. We will go through the evolution of a code example to see how we can type objects in a safer and more convenient way.

## Table of contents

## Initial Situation

Let's start with a simple subscription cost calculation function, where we have several plans:

```typescript
const subscriptionPlans = {
    'basic': (duration: number, cost: number) => duration * cost,
    'premium': (duration: number, cost: number) => duration * cost * 1.5,
    'vip': (duration: number, cost: number) => duration * cost * 2.5
};

const calculateSubscriptionCost = (plan: string, duration: number, cost: number) => {
    const subscriptionFunction = subscriptionPlans[plan];
    return subscriptionFunction(duration, cost);
};

const totalCost = calculateSubscriptionCost('premium', 6, 20);
console.log(totalCost);
```

In this code, `subscriptionPlans` contains functions, each of which takes `duration` and `cost` as parameters and returns the total cost.  

However, there is an issue — the `calculateSubscriptionCost` function accepts the `plan` parameter as a `string`, which is unsafe.

We could pass any value, such as `'gold'`, and it would cause a runtime error.

## Adding Typing for Plans

To avoid errors, we can explicitly specify the types of available subscription plans:

```typescript
type SubscriptionType = 'basic' | 'premium' | 'vip';

const subscriptionPlans = {
    'basic': (duration: number, cost: number) => duration * cost,
    'premium': (duration: number, cost: number) => duration * cost * 1.5,
    'vip': (duration: number, cost: number) => duration * cost * 2.5
};

const calculateSubscriptionCost = (plan: SubscriptionType, duration: number, cost: number) => {
    const subscriptionFunction = subscriptionPlans[plan];
    return subscriptionFunction(duration, cost);
};

const totalCost = calculateSubscriptionCost('premium', 6, 20);
console.log(totalCost);
```

Now we have restricted the subscription plan type, and TypeScript ensures that only one of the values: `'basic'`, `'premium'`, or `'vip'` can be passed.  


But adding a new plan requires modifying both the `SubscriptionType` type and the list of plans in the `subscriptionPlans` object. Let's fix that.

## Using `keyof typeof`

To simplify, we can use `keyof typeof` to automatically infer types based on the keys of the `subscriptionPlans` object:

```typescript
type SubscriptionType = keyof typeof subscriptionPlans;

const subscriptionPlans = {
    'basic': (duration: number, cost: number) => duration * cost,
    'premium': (duration: number, cost: number) => duration * cost * 1.5,
    'vip': (duration: number, cost: number) => duration * cost * 2.5,
    'ultra': (duration: number, cost: number) => duration * cost * 3.5
};
```

Now the `SubscriptionType` type is automatically updated if we add new plans, such as `'ultra'`.

## Using `Record` for Typing the Object

We can explicitly type the `subscriptionPlans` object using `Record` to ensure type matching between keys and values. This is useful because `Record` helps explicitly link plan types and functions, making the code more reliable and understandable. Thus, if a new plan is added, it will automatically be checked for type and function compatibility, reducing the likelihood of errors.

```typescript
type SubscriptionType = keyof typeof subscriptionPlans;

const subscriptionPlans: Record<string, (duration: number, cost: number) => number> = {
    'basic': (duration, cost) => duration * cost,
    'premium': (duration, cost) => duration * cost * 1.5,
    'vip': (duration, cost) => duration * cost * 2.5,
    'ultra': (duration, cost) => duration * cost * 3.5
};
```

This helps explicitly link plan types and functions, making the code more reliable and understandable. However, using `Record<string, ...>` makes the type broader since `keyof typeof subscriptionPlans` becomes `string`. This means `subscriptionPlans` can accept any string keys, requiring extra caution when adding new plans. We can revert `SubscriptionType` to an explicit union type, but that would require manually updating the type each time we add or change plans, which is less convenient.

## Using `satisfies` for Type Checking

Finally, we can use the `satisfies` operator to let TypeScript check if the `subscriptionPlans` object matches a specific type while still allowing type inference automatically:

```typescript
type SubscriptionType = keyof typeof subscriptionPlans;

const subscriptionPlans = {
    basic: (duration, cost) => duration * cost,
    premium: (duration, cost) => duration * cost * 1.5,
    vip: (duration, cost) => duration * cost * 2.5,
    ultra: (duration, cost) => duration * cost * 3.5,
} satisfies Record<string, (duration: number, cost: number) => number>;

const calculateSubscriptionCost = (plan: SubscriptionType, duration: number, cost: number) => {
    const subscriptionFunction = subscriptionPlans[plan];
    return subscriptionFunction(duration, cost);
};

const totalCost = calculateSubscriptionCost('ultra', 6, 20);
console.log(totalCost);
```

The `satisfies` operator allows us to check if the object matches the type `Record<string, (duration: number, cost: number) => number>`, while still keeping type inference so that TypeScript automatically determines all object keys and their types. This makes the code more flexible and error-resistant.


## In Simple Words...

In this article, we explored different ways to type a subscription plan object in TypeScript, making the code safer and more reliable. We started with a simple untyped version and gradually added more sophisticated typing strategies: using explicit types, `keyof typeof`, `Record`, and finally the `satisfies` operator. Each step made the code more robust, ensuring that our subscription plans were correctly typed and reducing potential runtime errors. Using `satisfies` was particularly helpful as it allowed us to keep automatic type inference while ensuring that the object conformed to a specific shape, making our code both flexible and type-safe.
