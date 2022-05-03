const Cart = require('../model/cart.model')
const Good = require('../model/good.model')

async function createCart(cart) {
    return Cart.create(cart);
}

async function updateCart({ good_id, user_id, number, selected }) {
    const res = await findCart({ good_id, user_id })
    if (!res) {
        // 无ID时新增
        return createCart({ good_id, user_id, number, selected })
    }
    if (number === 0) {
        // 数量为0时删除
        return destroyCart({ id: res.id })
    }
    const updateOpt = {}
    number && Object.assign(updateOpt, { number })
    selected && Object.assign(updateOpt, { selected })
    return Cart.update(updateOpt, {
        where: { id: res.id }
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

async function findCart({ good_id, user_id }) {
    return Cart.findOne({
        where: { user_id, good_id },
        raw: true
    })
}

module.exports = {
    createCart,
    updateCart,
    destroyCart,
    findCarts
}