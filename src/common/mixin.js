// 请求的tab栏数据操作
import { getCateParamsList } from 'network/params'
import { getGoodsCate } from 'network/goodsCate'
import { addGoods } from 'network/goodsList'
export const getTabData = {
  methods: {

    // 请求商品分类数据
    async getGoodsCateTab() {
      const { data } = await getGoodsCate()
      if (data.meta.status !== 200)
        return this.$message.error('获取商品分类数据失败!')
      this.cateList = data.data
    },

    // 发起商品参数请求
    async getCateParamsTab() {
      const { data } = await getCateParamsList(
        this.addForm.goods_cat[2],
        'many'
      )
      if (data.meta.status !== 200)
        return this.$message.error('获取商品参数失败!')
      // 处理一下attr_vals数据
      data.data.forEach((item) => {
        item.attr_vals =
          item.attr_vals.length !== 0 ? item.attr_vals.split(',') : []
      })
      this.goodsParams = data.data
    },

    // 发起商品属性请求
    async getCatePropsTab() {
      const { data } = await getCateParamsList(
        this.addForm.goods_cat[2],
        'only'
      )
      if (data.meta.status !== 200)
        return this.$message.error('获取商品属性失败!')
      this.goodsProps = data.data
    },

    // 发起商品添加请求
    async goodsContentTab(formData) {
      const { data } = await addGoods(formData)
      if (data.meta.status !== 201)
        return this.$message.error('添加商品失败!')
      this.$message.success("添加商品成功!")
      this.$router.push('/goods')
    }
  }
}