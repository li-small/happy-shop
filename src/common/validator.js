// 验证名称
export const vaildName = [
  { required: true, message: '请输入名称', trigger: 'blur' },
  {
    min: 2,
    max: 8,
    message: '输入长度在 2 到 8 个字符',
    trigger: 'blur',
  },
]

// 验证密码
export const vaildPassword = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  {
    min: 6,
    max: 15,
    message: '输入长度在 6 到 15 个字符',
    trigger: 'blur',
  },
]

// 验证邮箱
export const vaildEmail = [
  { required: false, message: '请输入邮箱', trigger: 'blur' },
  {
    type: 'email',
    message: '请输入正确的邮箱地址',
    trigger: 'blur',
  },
]

// 验证手机号
export const vaildMobile = [
  { required: false, message: '请输入手机号', trigger: 'blur' },
  {
    pattern:
      /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
    message: '请输入正确的手机号',
    trigger: 'blur',
  },
]

// 角色描述
export const vaildRoleDesc = [
  { required: true, message: '请输入角色描述', trigger: 'blur' },
  {
    min: 5,
    max: 15,
    message: '输入长度在 5 到 15 个字符',
    trigger: 'blur',
  },
]

// 动/静态属性
export const vaildParamsDesc = [
  { required: true, message: '请输入要添加的信息', trigger: 'blur' },
]

// 商品名称
export const vaildGoodsName = [
  { required: true, message: "请输入商品名称", trigger: 'blur' },
  {
    pattern: /^[\u4E00-\u9FA5A-Za-z0-9.]+$/,
    message: '请输入正确的商品名称(不能留空格)',
    trigger: 'blur',
  },
]

// 商品价格
export const vaildGoodsPrice = [
  { required: true, message: "请输入商品价格", trigger: 'blur' },
  {
    pattern: /^\d{1,}$/,
    message: '请输入正确的商品价格',
    trigger: 'blur',
  },
]

// 商品数量
export const vaildGoodsNumber = [
  { required: true, message: "请输入商品数量", trigger: 'blur' },
  {
    pattern: /^\d{1,}$/,
    message: '请输入正确的商品数量',
    trigger: 'blur',
  },
]

// 商品重量
export const vaildGoodsWeight = [
  { required: true, message: "请输入商品重量", trigger: 'blur' },
  {
    pattern: /^\d{1,}$/,
    message: '请输入正确的商品重量',
    trigger: 'blur',
  },
]

// 商品分类
export const vaildGoodsCat = [
  { required: true, message: "请重新选择商品分类" },
]

// 省市区/县
export const vaildAddress1 = [
  { required: true, message: "请选择省市区县", trigger: 'blur' }
]

// 详细地址
export const vaildAddress2 = [
  { required: true, message: "请输入详细地址", trigger: "blur" },
  {
    message: '请输入正确的详细地址',
    pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
    trigger: 'blur',
  },
]