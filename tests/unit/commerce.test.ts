import { describe, expect, it } from "vitest";
import { cartLineSchema } from "../../src/lib/validation/commerce";

describe("cart input boundary", () => {
  const variantId = "507f1f77bcf86cd799439011";
  it("rejects quantities that could bypass stock or order limits", () => {
    for (const quantity of [-1, 0, 1.5, 6, "2"])
      expect(cartLineSchema.safeParse({ variantId, quantity }).success).toBe(
        false,
      );
  });
  it("rejects client-controlled price fields", () => {
    expect(
      cartLineSchema.safeParse({ variantId, quantity: 1, pricePaise: 1 })
        .success,
    ).toBe(false);
  });
  it("accepts a valid variant selection", () => {
    expect(cartLineSchema.parse({ variantId, quantity: 2 })).toEqual({
      variantId,
      quantity: 2,
    });
  });
});
