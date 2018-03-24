import axios from './axios'
export default {
	axios : axios.axios,
	getImgUrl(url){  //处理图片资源403
		return url.replace(/http\w{0,1}:\/\//g,'https://images.weserv.nl/?url=')
	},
}
