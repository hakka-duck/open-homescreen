"use server";

import prisma from "@/lib/prisma";

export async function deleteHomeScreenById(id: number) {
  return prisma.homeScreen.delete({
    where: {
      id,
    },
  });
}
