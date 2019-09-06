<template>
	<el-form-item label="图片" prop="files" style="width: 100%;">
		<el-upload
			style="margin-top: 16px;"
			name="files"
			list-type="picture-card"
			multiple
			:with-credentials="true"
			:action="upload.action"
			:data="data"
			:file-list="fileList"
			:on-success="_onHandlePictureSuccess"
			:on-preview="_onHandlePictureCardPreview"
			:on-remove="_onHandlePictureCardRemove"
		>
			<i class="el-icon-plus"></i>
		</el-upload>
		<!-- 上传 -->
		<el-dialog :visible.sync="upload.visible" size="tiny"><img width="100%" :src="upload.imageUrl" alt="" /></el-dialog>
	</el-form-item>
</template>

<script>
import URLS from '../../api/urls';

export default {
	props: {
		data: {
			type: Object,
			default() {
				return { fileFirst: '' };
			}
		},
		fileList: {
			type: Array,
			default() {
				return [];
			}
		},
		files: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			upload: {
				action: URLS.uploadFiles,
				visible: false,
				imageUrl: ''
			}
		};
	},
	methods: {
		// 上传图片成功后返回
		_onHandlePictureSuccess(file) {
			const that = this;
			
			const { status, data } = file;
			if (status) {
				const [f] = Array.isArray(data) && data[0] ? data : [{}];

				// 追加图片
				// that.files.push(f);
				that.$emit('onHandlePictureSuccess', f);
			}
		},
		// 上传图片成功后预览
		_onHandlePictureCardPreview(file, fileList) {
			const that = this;

			const { url } = file;

			that.upload = {
				...that.upload,
				imageUrl: url,
				visible: true
			};
		},
		// 上传图片成功后删除
		_onHandlePictureCardRemove(file) {
			const that = this;

			const { response = {} } = file;
			const { data = [] } = response;
			const [{ filePath }] = Array.isArray(data) && data[0] ? data : [{}];

			// 删除图片
			// that.files = that.files.filter((item = {}) => {
			// 	if (item.filePath === filePath) return false;
			// 	return true;
			// });
			const files = that.files.filter((item = {}) => {
				if (item.filePath === filePath) return false;
				return true;
			});
			that.upload = {
				...that.upload,
				imageUrl: '',
				visible: false
			};
			that.$emit('onHandlePictureCardRemove', files);
		}
	}
};
</script>

<style></style>
