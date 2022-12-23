export default {
  upload: {
    url: '', // 上传 url，为空则不会触发上传相关事件	''
    max: 10 * 1024 * 1024, // 上传文件最大 Byte
    linkToImgUrl:	'', // 剪切板中包含图片地址时，使用此 url 重新上传	''
    linkToImgCallback: () => { // 图片地址上传回调

    },
    linkToImgFormat: () => { // 对图片地址上传的返回值进行格式化

    },
    success: () => { // 上传成功回调

    },
    error: () => { // 上传失败回调

    },
    token: '',// CORS 上传验证，头为 X-Upload-Token	-
    withCredentials: false, // 跨站点访问控制
    headers: '', // 请求头设置
    filename: (name) => name.replace(/\W/g, ''), // 文件名安全处理
    // accept	文件上传类型，同input accept	-
    // validate(files: File[]) => string | boolean	校验，成功时返回 true 否则返回错误信息	-
    // handler(files: File[]) => string | null | Promise | Promise	自定义上传，当发生错误时返回错误信息	-
    // format(files: File[], responseText: string): string	对服务端返回的数据进行转换，以满足内置的数据结构	-
    // file(files: File[]): File[] | Promise<File[]>	将上传的文件处理后再返回	-
    // setHeaders(): {}, //{ [key: string]: string }	上传前使用返回值设置头	-
    extraData: {}, // { [key: string]: string | Blob }	为 FormData 添加额外的参数	-
    multiple: true, // 上传文件是否为多个
    fieldName: 'file[]' // 上传字段名称
  }
}
