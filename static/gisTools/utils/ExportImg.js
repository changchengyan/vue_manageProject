define([
  'require',
  'exports',
  'esri/tasks/PrintTask',
  'esri/tasks/support/PrintParameters',
  'esri/tasks/support/PrintTemplate'
], function (require, exports,PrintTask, PrintParameters, PrintTemplate) {
  /**
   * @description 导出 img 图片
   * */

  var ExportImg = (function () {
    function ExportImg(infoProps) {

      this.view = infoProps.view;

      this.exportServiceURL = infoProps.serviceURL;

      this.printTask = new PrintTask({
        url: this.exportServiceURL,
        requestOptions: {
          method: 'post',
          timeout: 15000
        }
      });
      this.template = new PrintTemplate({
        format: 'png8',
        layout: 'map-only',
        exportOptions: {
          width: this.view.width,
          height: this.view.height,
          dpi: 96
        }
      });
      this.printParams = new PrintParameters({
        view: this.view,
        template: this.template
      });

    }

    ExportImg.prototype.start = function () {
      let temp_printParams = this.printParams;
      return new Promise((resolve, reject) => {
        this.printTask.execute(temp_printParams).then(function (results) {
          let image = document.createElement('img');
          let canvas = document.createElement('canvas');
          let context = canvas.getContext('2d');
          image.setAttribute('crossOrigin', 'anonymous');
          image.src = results.url;
          image.addEventListener('load', function (event) {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);
            resolve(canvas.toDataURL('image/png'));
          });
        }).catch(err=>{
          console.log(err);
        });
      }).catch(function (error) {
        console.log(error.message);
      });
    };

    return ExportImg;

  }());
  return ExportImg;
});

