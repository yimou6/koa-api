const path = require('path')
module.exports = {
    // 将status,banner,price,stock 参数转化为number类型
    async formBaseParams(ctx, next) {
        let { price, stock, status, banner } = ctx.request.body
        ctx.request.body.status = Number(status)
        ctx.request.body.banner = Number(banner)
        ctx.request.body.price = Number(price)
        ctx.request.body.stock = Number(stock)
        await next()
    },
    // 处理添加商品的参数
    // 主要是对图片进行处理
    async verifyGoodParams(ctx, next) {
        const { banner_img, good_img } = ctx.request.files
        let imageNames = []
        if (good_img) {
            if (Array.isArray(good_img)) {
                for (const img of good_img) {
                    imageNames.push(path.parse(img.filepath).base)
                }
            } else {
                imageNames.push(path.parse(good_img.filepath).base)
            }
        } else {
            return ctx.app.emit('err', ctx, 20001, 'good_img valid')
        }

        let bannerImage
        if (banner_img) {
            if (typeof banner_img === 'string') {
                bannerImage = path.parse(banner_img).base
            } else {
                bannerImage = path.parse(banner_img.filepath).base
            }
        }

        ctx.request.body.state = {
            good_img: imageNames.join(','),
            banner_img: bannerImage
        }

        await next()
    },
    // 修改商品的参数验证，主要是验证图片相关字段
    async verifyModifyParams(ctx, next) {
        const { banner_img, good_img } = ctx.request.files
        const { desc_img } = ctx.request.body
        // good_img 和 desc_img 不可都无数据
        if (!good_img && !desc_img) {
            return ctx.app.emit('err', ctx, 20001, 'good_img valid')
        }

        let imageNames = []
        if (good_img) {
            if (Array.isArray(good_img)) {
                for (const img of good_img) {
                    imageNames.push(path.parse(img.filepath).base)
                }
            } else {
                imageNames.push(path.parse(good_img.filepath).base)
            }
        }
        if (desc_img) {
            const temp = desc_img.split(',')
            for (const img of temp) {
                imageNames.push(path.parse(img).base)
            }
        }

        let bannerImage
        if (banner_img) {
            if (typeof banner_img === 'string') {
                bannerImage = path.parse(banner_img).base
            } else {
                bannerImage = path.parse(banner_img.filepath).base
            }
        }

        ctx.request.body.state = {
            good_img: imageNames.join(','),
            banner_img: bannerImage
        }

        await next()
    }
}