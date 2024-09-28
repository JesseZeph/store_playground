import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { Product } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";

export const addItemToCart = async (req: Request, res: Response) => {
  //TODO if item already exist, it should just increase the quantity of the product
  const validatedData = CreateCartSchema.parse(req.body);
  let product: Product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Product not found.",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
  const cart = await prismaClient.cartItem.create({
    data: {
      userId: req.user.id,
      productId: product.id,
      quantity: validatedData.quantity,
    },
  });
  res.json(cart);
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      id: req.user.id,
    },
    include: {
      product: true,
    },
  });
  res.json(cart);
};

export const changeQuantity = async (req: Request, res: Response) => {
  // Check if user is updating its own cart item
  const validatedData = ChangeQuantitySchema.parse(req.body);
  const updatedCart = await prismaClient.cartItem.update({
    where: {
      id: +req.params.id,
    },
    data: {
      quantity: validatedData.quantity,
    },
  });
  res.json(updatedCart);
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  //TODO: Check if user is deleting its own cart item
  await prismaClient.cartItem.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.json({ success: true });
};
