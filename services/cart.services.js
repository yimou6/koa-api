const Cart = require('../model/cart.model')
const Good = require('../model/good.model')

async function createCart(cart) {
    return Cart.create(cart);
}

async function updateCart({ id, good_id, user_id, number, selected }) {
    if (!id) {
        // 无ID时新增
        return createCart({ good_id, user_id, number, selected })
    }
    if (number === 0) {
        // 数量为0时删除
        return destroyCart({ id })
    }
    return Cart.update({
        number,
        selected
    }, {
        where: { id }
    })
}

async function destroyCart({ id }) {
    return Cart.destroy({
        where: { id }
    })
}

async function findCarts(user_id) {
    return await Cart.findAndCountAll({
        where: {
            user_id
        },
        include: {
            model: Good,
            as: 'good_info'
        }
    })
}

module.exports = {
    createCart,
    updateCart,
    destroyCart,
    findCarts
}