const { prisma } = require("../services/prisma")

exports.createUser = async (data) => {
    const user = await prisma.user.create({
        data
    });

    return user;
}

exports.getUsers = async () => {
    const users = await prisma.user.findMany({});

    return users;
};

exports.getById = async (id) => {
    const user = prisma.user.findUnique({
        where: {
            id
        }
    });

    return user;
}

exports.updateUser = async (id, data) => {
   const user = prisma.user.update({
        data,
        where: {
            id
        }
   });

   return user;
};

exports.removeUser = async(id) => {
    await prisma.user.delete({
        where: {
            id
        }
    });

    return;
};